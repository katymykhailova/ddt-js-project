import getRefs from '../refs/get-refs';
const refs = getRefs();

function isFooterToBottom() {
  const heightBody = refs.bodyEl.clientHeight;
  const heightFooter = refs.footerEl.clientHeight;
  return heightBody - heightFooter < document.documentElement.clientHeight;
}

function footerToBottom() {
  if (isFooterToBottom()) {
    refs.footerEl.classList.add('footerToBottom');
  } else {
    refs.footerEl.classList.remove('footerToBottom');
  }
}

export { footerToBottom };
