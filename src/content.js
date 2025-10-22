(function() {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi;
  const allowedEmails = ["info@signize.us"];

  function hideEmails(node) {
    if (node.nodeType === Node.TEXT_NODE && emailRegex.test(node.textContent)) {
      node.textContent = node.textContent.replace(emailRegex, match => {
        return allowedEmails.includes(match.toLowerCase()) ? match : "*****";
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(child => hideEmails(child));
    }
  }

  hideEmails(document.body);

  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => hideEmails(node));
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
