
var articles_id = document.getElementById("articles");
var search_btn = document.getElementById("search_btn");
var search_box = document.getElementById("search_box")


search_box.addEventListener('keyup' , function(event ){
    {
	event.preventDefault();
	if(event.keyCode === 13){
	    search_btn.click();
	}
    }
})


search_btn.addEventListener('click', function()
    {
	getData();
    })

function getData()
{
    var search_id = document.getElementById("search_box").value;
    var wiki_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search_id}&format=json&limit=10`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', wiki_url , true);
    xhr.onload = function()
    {
	var res = {};
	if(this.status == 200)
	{
	    res =  JSON.parse(this.response);
	}
	displayData(res);
    }
    xhr.send();
    removeArticles();
}

function removeArticles()
{
    while(articles_id.firstChild) articles_id.removeChild(articles_id.firstChild)
}

function displayData(res)
{
    var articles =res[2].map((content, idx) =>  {
	articles_id.innerHTML += `
	    <div class=articles>
	    <p> ${res[1][idx]}</p>
	    <a href="${res[3][idx]}" target="_blank">
		${content} </a>
	</div> `
    })
}
