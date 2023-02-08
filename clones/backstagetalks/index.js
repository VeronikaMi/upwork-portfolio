const issuesContainer = document.getElementById("issues");

const issuesLinks = document.getElementById("issues-links");

const issue = document.querySelector(".issue");
const $main = $("main");

const issues = [
  { id: 6, title: "Issue #6", buyHere: true, luckySelectedStores: false },
  { id: 5, title: "Issue #5", buyHere: true, luckySelectedStores: false },
  {
    id: 4,
    title: "Issue #4 is sold out.",
    buyHere: false,
    luckySelectedStores: true,
  },
  { id: 3, title: "Issue #3", buyHere: true, luckySelectedStores: false },
  { id: 2, title: "Issue #2", buyHere: true, luckySelectedStores: false },
  {
    id: 1,
    title: "Issue #1 is sold out.",
    buyHere: false,
    luckySelectedStores: true,
  },
];

issues.forEach((issue) => {
  let div = document.createElement("div");
  div.className = "issue";
  div.id = `issue${issue.id}`;
  div.dataset.color = issue.id; //will set data-color

  div.innerHTML = `
  <img src="./assets/backstagetalks_cover_issue_${issue.id}.png" alt="issue#${
    issue.id
  }" />
  <p>${issue.title}</p>
  ${issue.buyHere ? '<a id="buy" class="link" href="#">BUY HERE</a>' : ""}
  <p class="stores">${
    issue.luckySelectedStores
      ? "If you are lucky, you may get the last pieces"
      : "or"
  } in <a href="#" class="link">selected stores</a>.</p>`;

  issuesContainer.insertBefore(
    div,
    issuesContainer.children[issuesContainer.children.length - 3]
  );

  console.log(issuesContainer.children[issuesContainer.children.length - 3]);
  let links = document.createElement("a");
  links.href = `#issue${issue.id}`;
  links.innerHTML = `Issue #${issue.id}`;
  links.id = issue.id;
  if (issue.id == 6) {
    links.classList.add("active");
  }

  issuesLinks.appendChild(links);
});

issuesContainer.addEventListener("scroll", function () {
  console.log(
    issuesContainer.scrollHeight,
    window.innerHeight,
    issuesContainer.scrollTop
  );

  issuesContainer.childNodes.forEach(function () {
    // let currentIssue = Math.ceil(
    //   (issuesContainer.scrollHeight - issuesContainer.scrollTop) /
    //     (window.innerHeight + 80)
    // );
    let currentIssue = Math.ceil(
      (window.innerHeight * issues.length - issuesContainer.scrollTop) /
        (window.innerHeight + 80)
    );

    $main.removeClass(function (index, css) {
      return (css.match(/(^|\s)color-\S+/g) || []).join(" ");
    });

    if (currentIssue != 6) {
      $main.addClass("color-" + +currentIssue);
    }

    issuesLinks.childNodes.forEach((link) => {
      link.classList.remove("active");
    });

    $(`#${currentIssue}`).addClass("active");
  });
});
