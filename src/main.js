require('./styles.css');

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function selectEvent(event)
{
  event.preventDefault();
  const target = event.target;
  if (!target) return;
  const eventType = target.dataset.action;
  if (!eventType) return;
  switch (eventType) {
    case 'url':
      const targetUrl = target.dataset.url;
      if (targetUrl)
        window.open(targetUrl, '_self');
      break;

    case 'accept':
      acceptCookies();
      break;
  }
}

function acceptCookies()
{
  setCookie('lgpd-cookie', 'true', 7);
  const wrapperActive = document.querySelectorAll('.lgpd-wrapper.active');
  if (wrapperActive) wrapperActive.forEach(item => {
    item.classList.remove('prepare');
    item.classList.remove('active');
  });
}

function checkCookieExists()
{
  const lgpdCookie = getCookie('lgpd-cookie');
  if (lgpdCookie === 'true') return;

  const wrapper = document.querySelectorAll('.lgpd-wrapper');
  if (wrapper) wrapper.forEach(item => item.classList.add('prepare'));
  setTimeout(() => {
    if (wrapper) wrapper.forEach(item => item.classList.add('active'));
  }, 300);
}

function createLGPDElements()
{
  let lgpd_content = null;
  if (window.lgpd_content === undefined) {
    lgpd_content = lgpd_defaults;
  } else {
    lgpd_content = {
      ...lgpd_defaults,
      ...window.lgpd_content,
    };
  }

  const buttonAccept = document.createElement('button');
  buttonAccept.classList.add('lgpd-button');
  buttonAccept.dataset.action = 'accept';
  buttonAccept.innerHTML = lgpd_content ? lgpd_content.acceptText : 'lgpd_content.acceptText';

  const buttonUrl = document.createElement('button');
  buttonUrl.classList.add('lgpd-button');
  buttonUrl.classList.add('line');
  buttonUrl.dataset.action = 'url';
  buttonUrl.dataset.url = lgpd_content ? lgpd_content.url : 'lgpd_content.url';
  buttonUrl.innerHTML = lgpd_content ? lgpd_content.urlText : 'lgpd_content.urlText';

  const wrapper = document.createElement('div');
  wrapper.classList.add('lgpd-wrapper');

  const container = document.createElement('div');
  container.classList.add('lgpd-container');

  const message = document.createElement('div');
  message.classList.add('lgpd-message');
  message.innerHTML = lgpd_content ? lgpd_content.message : 'lgpd_content.message';

  const actions = document.createElement('div');
  actions.classList.add('lgpd-actions');
  actions.append(buttonAccept);
  if (lgpd_content.url) actions.append(buttonUrl);

  container.append(message);
  container.append(actions);

  wrapper.append(container);

  return wrapper;
}

function injectLGPDElements()
{
  const lgpdCookie = getCookie('lgpd-cookie');
  if (lgpdCookie === 'true') return;

  const lgpgElements = createLGPDElements();
  const body = document.querySelector('body');
  body.append(lgpgElements);
}

const lgpd_defaults = {
  message: 'Utilizamos cookies para oferecer melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo. Ao utilizar este site, você concorda com o uso de cookies.',
  url: '',
  acceptText: 'Entendi',
  urlText: 'Saiba mais',
};

window.onload = function ()
{
  injectLGPDElements();
  const actions = document.querySelectorAll('[data-action]');
  if (actions) actions.forEach(action => {
    action.addEventListener('click', selectEvent);
  });
  setTimeout(checkCookieExists, 3000);
}
