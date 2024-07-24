const playButton = document.querySelector(".play"); 
        const lapButton = document.querySelector(".lap");
        const resetButton = document.querySelector(".reset");
        const clearButton = document.querySelector(".lap-clear-button"); 
        const minute = document.querySelector(".minute"); 
        const second = document.querySelector(".sec"); 
        const centiSecond = document.querySelector(".msec");
        const laps = document.querySelector(".laps");

        let isPlay = false;
        let secCounter = 0;
        let minCounter = 0;
        let centiCounter = 0;
        let minInterval, secInterval, centiInterval;
        let lapItem = 0;
        let isReset = false;

        const toggleButton = () => {
            lapButton.classList.remove("hidden");
            resetButton.classList.remove("hidden");
        };

        const play = () => {
            if (!isPlay) {
                playButton.textContent = 'Pause';
                minInterval = setInterval(() => {
                    minute.textContent = `${String(minCounter).padStart(2, '0')} :`;
                }, 60 * 1000);
                secInterval = setInterval(() => {
                    if(secCounter === 60){
                        secCounter = 0;
                        minCounter++;
                    }
                    second.textContent = `${String(secCounter++).padStart(2, '0')} :`;
                }, 1000);
                centiInterval = setInterval(() => {
                    if (centiCounter === 100) {
                        centiCounter = 0;
                    }
                    centiSecond.textContent = String(centiCounter++).padStart(2, '0'); 
                }, 10);
                isPlay = true;
                isReset = true;
            } else {
                playButton.textContent = 'Play';
                clearInterval(minInterval);
                clearInterval(secInterval);
                clearInterval(centiInterval);
                isPlay = false;
            }
            toggleButton();
        };

        const reset = () => {
            clearInterval(minInterval);
            clearInterval(secInterval);
            clearInterval(centiInterval);
            isPlay = false;
            isReset = false;
            minCounter = 0;
            secCounter = 0;
            centiCounter = 0;
            playButton.textContent = 'Play';
            lapButton.classList.add("hidden");
            resetButton.classList.add("hidden");
            minute.textContent = '00 :';
            second.textContent = '00 :';
            centiSecond.textContent = '00';
            laps.innerHTML = '';
            clearButton.classList.add("hidden");
        };

        const lap = () => {
            const li = document.createElement("li");
            const number = document.createElement("span");
            const timeStamp = document.createElement("span");

            li.className = "lap-item";
            number.className = "number";
            timeStamp.className = "time-stamp";

            number.textContent = `#${++lapItem}`;
            timeStamp.textContent = `${String(minCounter).padStart(2, '0')} : ${String(secCounter).padStart(2, '0')} : ${String(centiCounter).padStart(2, '0')}`;

            li.append(number, timeStamp);
            laps.append(li);

            clearButton.classList.remove("hidden");
        };

        const clearAll = () => {
            laps.innerHTML = '';
            clearButton.classList.add("hidden");
            lapItem = 0;
        };

        playButton.addEventListener("click", play);
        resetButton.addEventListener("click", reset);
        lapButton.addEventListener("click", lap);
        clearButton.addEventListener("click", clearAll);