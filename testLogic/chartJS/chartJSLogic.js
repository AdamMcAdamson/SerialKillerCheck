
    console.log("ready");
    function mainProgram() {
    // instantiate Chart class
    var ctx = $("#compareChart");
    // instantiate Radar chart style
    var killerCompare = new Chart(ctx, {
            type: "radar",
            data: {
                labels: ["Age", "Eyes", "Eyebrows", "Mouth", "TBD"],
                datasets: [{
                        label: "You",
                        // characteristics populated in eg.js
                        data: [killerAge2, 43.56, 30, 40, 0],
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        borderWidth: 1
                 	   },
                 	   {
                        label: "Serial Killer",
                        // characteristics populated in eg.js
                        data: [killerAge, killerEyes, killerEyebrows, killerMouth, 0],
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        borderWidth: 1
                    	}]

        },



        options: {
            scale: {
                reverse: false,
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });

    

}



