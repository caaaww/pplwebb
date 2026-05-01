if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function getSensor() {
  const { data } = await supabaseClient
    .from("data_sensor")
    .select("*")
    .order("data_id", { ascending: false });

  let rows = "";

  data.forEach(item => {
    const statusClass = item.status_air === "Normal" ? "badge-success"
      : item.status_air === "Bahaya" ? "badge-danger" : "badge-warning";

    rows += `
    <tr>
      <td>${item.nilai_ph}</td>
      <td><span class="badge ${statusClass}">${item.status_air}</span></td>
      <td>${item.nilai_berat} g</td>
      <td>${item.waktu}</td>
    </tr>`;
  });

  document.getElementById("sensorBody").innerHTML = rows;
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

getSensor();
