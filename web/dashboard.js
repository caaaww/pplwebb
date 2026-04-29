if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function getData() {

  const { data } = await supabaseClient
    .from("sensor_data")
    .select("*")
    .order("id", { ascending: false })
    .limit(20);

  document.getElementById("ph").innerHTML =
    data[0].ph;

  document.getElementById("berat").innerHTML =
    data[0].berat + " g";

  const labels =
    data.map(item => item.created_at);

  const phData =
    data.map(item => item.ph);

  const beratData =
    data.map(item => item.berat);

  const ctx =
    document.getElementById("chart");

  new Chart(ctx, {

    type: "line",

    data: {

      labels: labels,

      datasets: [

        {
          label: "pH",
          data: phData
        },

        {
          label: "Berat",
          data: beratData
        }

      ]
    }

  });
}

function logout() {

  localStorage.removeItem("login");

  window.location.href = "index.html";
}

getData();

setInterval(getData, 5000);