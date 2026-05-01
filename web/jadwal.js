if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function tambahJadwal() {
  const jam = document.getElementById("jam").value;
  const jumlah = document.getElementById("jumlah").value;

  await supabaseClient
    .from("jadwal_pakan")
    .insert([{ waktu_pakan: jam, jumlah_pakan: jumlah, status: "Aktif" }]);

  alert("Jadwal berhasil ditambah");
  getJadwal();
}

async function hapusJadwal(id) {
  await supabaseClient
    .from("jadwal_pakan")
    .delete()
    .eq("jadwal_id", id);
  getJadwal();
}

async function getJadwal() {
  const { data } = await supabaseClient
    .from("jadwal_pakan")
    .select("*");

  let rows = "";
  data.forEach(item => {
    const statusClass = item.status === "Aktif" ? "badge-success" : "badge-warning";
    rows += `
    <tr>
      <td>${item.waktu_pakan}</td>
      <td>${item.jumlah_pakan} g</td>
      <td><span class="badge ${statusClass}">${item.status}</span></td>
      <td><button class="btn-danger" onclick="hapusJadwal(${item.jadwal_id})">Hapus</button></td>
    </tr>`;
  });

  document.getElementById("jadwalBody").innerHTML = rows;
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

getJadwal();
