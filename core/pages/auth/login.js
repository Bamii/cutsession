(function() {
  const username = "";
  const password = "";
  const access = "";

  const res = fetch("https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856", {
    method: "post",
    body: JSON.stringify({})
  });

  navigate("/")
})();