function getHalloweenCountdown() {
    let currentYear = new Date().getFullYear();
    let dayOfHalloween = new Date(
      `October 31, ${currentYear} 00:00:00`
    ).getTime();
    // const today = new Date('July 7, 2022 23:59:45').getTime();
    const today = new Date().getTime();
    let secondsTillHalloween = dayOfHalloween - today;
    if (secondsTillHalloween < 0) {
      currentYear++;
      dayOfHalloween = new Date(`October 31, ${currentYear} 00:00:00`).getTime();
      secondsTillHalloween = dayOfHalloween - today;
    }
    const daysTillHalloween = Math.floor(
      secondsTillHalloween / 1000 / 60 / 60 / 24
    );
    console.log("daysTillHalloween", daysTillHalloween);
  
    return daysTillHalloween;
  }

  module.exports = getHalloweenCountdown;