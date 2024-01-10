function attachEventsListeners() {
  const button = Array.from(document.querySelectorAll('input[type="button"]'));

  button.forEach((b) => {
    console.log(b);
    b.addEventListener("click", (e) => {
      if (b.id === "daysBtn") {
        const dayVal = document.querySelector("#days").value;
        document.querySelector("#hours").value = dayVal * 24;
        document.querySelector("#minutes").value = dayVal * 24 * 60;
        document.querySelector("#seconds").value = dayVal * 24 * 60 * 60;
      } else if (b.id === "hoursBtn") {
        const horVal = document.querySelector("#hours").value;
        document.querySelector("#days").value = horVal / 24;
        document.querySelector("#minutes").value = horVal * 60;
        document.querySelector("#seconds").value = horVal * 60 * 60;
      } else if (b.id === "minutesBtn") {
        const minVal = document.querySelector("#minutes").value;
        document.querySelector("#days").value = minVal / 60 / 24;
        document.querySelector("#hours").value = minVal / 60;
        document.querySelector("#seconds").value = minVal * 60;
      } else if (b.id === "secondsBtn") {
        const secVal = document.querySelector("#seconds").value;
        document.querySelector("#days").value = secVal / 60 / 60 / 24;
        document.querySelector("#hours").value = secVal / 60 / 60;
        document.querySelector("#minutes").value = secVal / 60;
      }
    });
  });

  
}
