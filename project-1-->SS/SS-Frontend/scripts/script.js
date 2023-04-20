import { ethers } from "../scripts/ethers.js";
import { address, abi } from "../scripts/constrains.js";

const connectBtn = document.getElementById("connectBtn");
const addNumber = document.getElementById("addNumber");
const getNumber = document.getElementById("getNumber");
const favNumIs = document.getElementById("favNumIs");
const nameToNum = document.getElementById("nameToNum");
const nameToNumVal = document.getElementById("nameToNumVal");
const getNumberFromArray = document.getElementById("getNumberFromArray");
connectBtn.onclick = connectMetaMask;
addNumber.onclick = addNumberFunc;
getNumber.onclick = getNumberFunc;
nameToNum.onclick = addPersonFunc;
getNumberFromArray.onclick = getPersonFavNumber;

async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    connectBtn.innerHTML = "Connected";
    console.log("Connected!");
  } else {
    connectBtn.innerHTML = "Failed!";
    console.log("Failed!Please install MetaMask!");
  }
}

async function deploy() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
}

async function addNumberFunc() {
  const favNumber = document.getElementById("getFav").value;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(address, abi, signer);
  const contract = await deploy();
  const transactionResponse = await contract.addNumber(favNumber);
  await listenToTransaction(transactionResponse);
  console.log(`Favorite number i.e. ${favNumber} is Stored!`);
}

async function getNumberFunc() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(address, abi, signer);
  const contract = await deploy();
  const storedFavNumber = await contract.getNumber();
  console.log(`Your Favorite number is ${storedFavNumber}`);
  favNumIs.innerHTML = storedFavNumber;
}

async function addPersonFunc() {
  const name = document.getElementById("addName").value;
  const favNumber = document.getElementById("addFavNumber").value;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(address, abi, signer);
  const contract = await deploy();
  const transactionResponse = await contract.addPerson(name, favNumber);

  await listenToTransaction(transactionResponse);
  console.log(`${name} and ${favNumber} is added!`);
}

async function getPersonFavNumber() {
  const name = document.getElementById("getFavNumber").value;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(address, abi, signer);
  const contract = await deploy();
  const storedFavNumber = await contract.nameToFavNumber(name);
  const nameToVal = document.getElementById("nameToNumVal");
  nameToVal.innerHTML = storedFavNumber;
  console.log(
    `Name is ${name} and His/Her Favorite number is ${storedFavNumber}.`
  );
}

function listenToTransaction(transactionResponse) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(`Mining....${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transcationReceipt) => {
      console.log(`Completed with ${transcationReceipt.confirmations}....`);
    });
    resolve();
  });
}
