if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function getDashboard() {
  const { data } = await supabaseClient
    .from("data_sensor")
    .select("*")
    .order("data_id", { ascending: false })
    .limit(10);

  document.getElementById("ph").innerHTML = data[0].nilai_ph;
  document.getElementById("status").innerHTML = data[0].status_air;
  document.getElementById("berat").innerHTML = data[0].nilai_berat + " g";

  const labels = data.map(item => item.waktu).reverse();
  const phData = data.map(item => item.nilai_ph).reverse();

  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Nilai pH',
        data: phData,
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20,184,166,0.1)',
        borderWidth: 2.5,
        pointBackgroundColor: '#2dd4bf',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
        }
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { size: 11 } },
          grid: { color: 'rgba(13,148,136,0.1)' }
        },
        y: {
          ticks: { color: '#64748b', font: { size: 11 } },
          grid: { color: 'rgba(13,148,136,0.1)' }
        }
      }
    }
  });
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

getDashboard();
