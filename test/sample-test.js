const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  let Greeter;
  let greeter;
  let owner;
  let user;

  // деплоим контракт
  before(async function () {
    // Собрали контракт
    Greeter = await ethers.getContractFactory("Greeter");
    // Задеплоили контракт
    greeter = await Greeter.deploy("Hello, world!");
    // подождали пока он будет задеплоин
    await greeter.deployed();
    // получили адреса owner и ещё одного типа
    [owner, user] = await ethers.getSigners();
  })

  // проверяем, что owner может изменить приветствие
  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  // проверяем, что owner не может изменить приветствие на то же самое
  it("An exception should be thrown when trying to set the same without changing", async function () {
    
    expect(await greeter.greet()).to.equal("Hola, mundo!");

    await expect(
      greeter.setGreeting("Hola, mundo!")
    ).to.be.revertedWith("You must change the greeting");

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  // проверяем, что приветствие может изменять только owner
  it("You can't change the greeting from another account", async function(){

    // запускаем функцию от имени другого аккаунта - должен сработать require
    await expect(
      greeter.connect(user).setGreeting("Hi!")
    ).to.be.revertedWith("You don't own the contract");

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  })




});
