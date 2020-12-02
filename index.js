
generateApiUrl = (offset, type) => {
    const apiKey = "4p7w4YD3KnU48WzncbVg5PTrJYdGB4yk";
    console.log(type);
  
    const select = document.getElementById("limit");
  
    const selectValue = select.options[select.selectedIndex].value;
  
  
    let giphyAPI = "";
  
    if (type === "Search") {
      const searchInput = document.getElementById("search").value;
      giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}&offset=${offset}&limit=${selectValue}`;
    } else if (type === "Trending") {
      giphyAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&offset=${offset}&limit=${selectValue}`;
    }
  
    return giphyAPI;
  };
  
  getGif = (offset, type) => {
    console.log(type);
  
    generatePageNumber(1);
  
  
    const URL = generateApiUrl(offset, type);
  
    fetch(URL)
      .then(function(resp) {
  
        if (!resp.ok) {
          document.getElementById("result").innerHTML = "Error blababla";
          throw Error(resp.statusText);
        } else {
          return resp.json();
        }
  
      })
      .then(function(response) {
  
        if (response.pagination.total_count !== 0) {
          document.getElementById("pagination").style.display = "block";
          generatePagination(response.pagination, type);
        } else {
          document.getElementById("pagination").style.display = "none";
        }
        if (response.pagination.offset == 0) {
          setFirstElementToActive();
        }
  
        loadGifs(response.data);
      })
      .catch(err => console.log(err));
  };
  
  loadGifs = result => {
    cleanResultDiv();
  
    result.map(item => {
  
      const image = item.images.fixed_height_downsampled.url;
  
      const newImg = document.createElement("img");
      newImg.setAttribute("src", image);
  
      document.getElementById("result").appendChild(newImg);
    });
  };
  
  getLinks = () => {
  
    return document.getElementsByTagName("a");
  };
  generatePagination = (data, type) => {
    let links = getLinks();
    for (let i = 0; i < links.length; i++) {
      links[i].onclick = e => changeIndex(e, data, type)
    }
  };
  
  
  changeIndex = (event, data, type) => {
    handleActives(event);
    const contentValue = parseInt(event.target.innerText);
  
    const index = parseInt(
      event.target.attributes.index.value
    );
    const count = data.count;
    const offset = (contentValue - 1) * count;
  
    getGif(offset, type);
  
    if (index == 9) {
      generatePageNumber(contentValue - 8);
    }
    if (contentValue > 1 && index == 0) {
      generatePageNumber(contentValue - 1);
    }
  };
  
  cleanActives = () => {
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].className = "page-item";
    }
  };
  
  handleActives = event => {
    cleanActives();
    event.target.parentElement.className += " active";
  };
  
  setFirstElementToActive = () => {
    cleanActives();
    document.getElementsByClassName("page-item")[0].className += " active";
  };
  
  generatePageNumber = start => {
    let links = getLinks();
    for (let i = start; i < start + 10; i++) {
      links[i - start].innerText = i;
    }
  };
  cleanResultDiv = () => {
    document.getElementById("result").innerHTML = "";
  };
  const inputSearch = document.getElementById("btnSearch");
  const inputTrending = document.getElementById("btnTrending");
  
  inputSearch.addEventListener("click", function() {
    getGif(0, "Search");
  });
  
  inputTrending.addEventListener("click", function() {
    getGif(0, "Trending");
  });
  