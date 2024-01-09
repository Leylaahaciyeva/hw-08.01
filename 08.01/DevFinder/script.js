"use strict";

const result = document.getElementById("result");

const input = document.getElementById("input");
const btn = document.getElementById("search__btn");

const user = document.getElementById("user");
const username = document.getElementById("username");
const joined = document.getElementById("date");
const repos = document.getElementById("repo");
const followers = document.getElementById("follower");
const followings = document.getElementById("following");
const bio = document.getElementById("bio");
const img = document.getElementById("img");

const repo__links = document.getElementById("repo__links");

const loading = document.getElementById("loading");
const errorEl = document.getElementById("error");

let dev;
let repositories=[];

const getData=(searchValue)=>{
    fetch(`https://api.github.com/users/${searchValue}`)
    .then((res)=>{
        if (!res.ok) {
         throw new Error("Couldn't find any user")
        }
        return res.json();
    }).then((data)=>{
        dev=data;
        loading.classList.remove("hidden")
       displayUsers();
    })
    .catch((error)=>{
        errorEl.classList.remove("hidden")
        errorEl.innerText=error.message;
        loading.classList.add("hidden");
    })
}
const getRepos=(searchValue)=>{
    fetch(`https://api.github.com/users/${searchValue}/repos`)
    .then((res)=>{
      return res.json();
    }).then((data)=>{
        repositories=data.slice(0,10)
        repositories.forEach((repo)=>{
         displayRepos(repo);
        })
    })
}


const displayUsers=()=>{


    if (dev) {
        result.classList.replace("hidden","flex")
        loading.classList.add("hidden")
    }


    const indexOfT=dev.created_at.indexOf("T")

    repos.textContent=dev.public_repos;
    followers.textContent=dev.followers;
    followings.textContent=dev.following;
    bio.textContent=!dev.bio ? "No Bio" : dev.bio;
    username.textContent="@" + dev.login;
    username.href=dev.html_url;
    img.src=dev.avatar_url;
    user.textContent=dev.name;
    joined.textContent=dev.created_at.slice(0,indexOfT);
}


const displayRepos=(repo)=>{
   const link=document.createElement("a");
   link.textContent=repo.name;
   link.href=repo.html_url;
   link.target="blank";
   link.className="text-white text-sm bg-blue-600 rounded-md p-2 mr-2 mb-2  inline-block";
   repo__links.insertAdjacentElement("beforeend",link);
}



btn.addEventListener("click",()=>{

    const givenValue=input.value.trim();

    if (!givenValue) return;

    result.classList.replace("flex","hidden")
    loading.classList.remove("hidden")
    errorEl.classList.add("hidden")

    getData(givenValue)
    getRepos(givenValue)

    input.value="";
})
