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

window.onload = function ()
{
  const actions = document.querySelectorAll('[data-action]');
  if (actions) actions.forEach(action => {
    action.addEventListener('click', selectEvent);
  });
  setTimeout(checkCookieExists, 3000);
}
