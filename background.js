chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('www/index.html', {
    id: "liveRhino",
    state: "maximized"
  });
});
