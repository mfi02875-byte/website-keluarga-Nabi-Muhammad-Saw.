/* =====================================================
   Mengenal Keluarga dan Sahabat Nabi Muhammad SAW
   script.js: data, navigasi, pencarian, kuis, penilaian
   ===================================================== */
(function () {
  "use strict";

  /* ---------- 1. Pembantu kecil ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Hapus tanda apostrof/hamzah agar "Sa'ad" dan "Saad" sama-sama ditemukan
  const norm = (s) => String(s).toLowerCase().replace(/['’`ʻʿ]/g, "").trim();

  function acak(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- 2. Data kategori & tokoh ---------- */
  const KATEGORI = {
    keluarga: { nama: "Keluarga Nabi", ikon: "🕌" },
    istri: { nama: "Istri-Istri Nabi", ikon: "🌙" },
    anak: { nama: "Anak-Anak Nabi", ikon: "🌱" },
    kerabat: { nama: "Kerabat Nabi", ikon: "🤝" },
    sahabat: { nama: "Sahabat Nabi", ikon: "⭐" },
  };

  // t(id, kategori, nama, hubungan, latar, kisah, peran, teladan, catatan)
  const t = (id, kat, nama, hubungan, latar, kisah, peran, teladan, catatan) =>
    ({ id, kat, nama, hubungan, latar, kisah, peran, teladan, catatan: catatan || "" });

  const TOKOH = [
    /* ===== KELUARGA ===== */
    t("abdullah-ayah", "keluarga", "Abdullah bin Abdul Muthalib", "Ayah Nabi Muhammad SAW",
      "Putra Abdul Muthalib dari Bani Hasyim, suku Quraisy. Ia dikenal rupawan dan sangat disayangi ayahnya.",
      "Ayahnya pernah bernazar mengorbankan salah satu putranya. Undian jatuh pada Abdullah, lalu ditebus dengan seratus unta. Ia menikah dengan Aminah binti Wahb, kemudian berdagang ke Syam dan jatuh sakit dalam perjalanan pulang di Madinah.",
      "Ayah dari Rasulullah SAW. Ia tidak sempat menyaksikan putranya tumbuh besar.",
      "Berbakti kepada orang tua dan menjaga kehormatan diri.",
      "Menurut pendapat yang paling masyhur, Abdullah wafat saat Nabi masih dalam kandungan. Sebagian riwayat menyebut setelah Nabi lahir."),
    t("aminah", "keluarga", "Aminah binti Wahb", "Ibu Nabi Muhammad SAW",
      "Berasal dari Bani Zuhrah, keluarga terpandang di Makkah. Ayahnya, Wahb bin Abdu Manaf, adalah pemimpin kaumnya.",
      "Setelah suaminya wafat, Aminah merawat Nabi bersama pengasuh. Ketika Nabi berusia sekitar enam tahun, ia mengajaknya berziarah ke makam suaminya di Madinah. Dalam perjalanan pulang ia sakit dan wafat di Abwa’.",
      "Melahirkan dan membesarkan Nabi pada masa kecilnya yang yatim.",
      "Kasih sayang dan ketabahan seorang ibu yang berjuang sendirian.",
      ""),
    t("abdul-muthalib", "keluarga", "Abdul Muthalib (Syaibah bin Hasyim)", "Kakek Nabi Muhammad SAW",
      "Pemimpin Quraisy yang disegani dan penjaga urusan air untuk jamaah haji. Nama aslinya Syaibah.",
      "Ia menggali kembali sumur Zamzam yang lama tertimbun. Ketika pasukan bergajah Abrahah datang menyerang Ka’bah, ia berserah kepada Allah. Setelah Aminah wafat, ia mengasuh cucunya dengan penuh sayang sampai wafat saat Nabi sekitar delapan tahun.",
      "Pelindung dan pengasuh Nabi pada masa kecil.",
      "Kepemimpinan yang adil, murah hati, dan penuh tanggung jawab terhadap keluarga.",
      ""),
    t("abu-thalib", "keluarga", "Abu Thalib bin Abdul Muthalib", "Paman Nabi Muhammad SAW",
      "Saudara seayah-seibu Abdullah. Nama aslinya Abdu Manaf. Ia pedagang yang berpenghasilan sederhana namun berkeluarga besar.",
      "Setelah Abdul Muthalib wafat, ia mengasuh Nabi. Ia pernah mengajak Nabi berdagang ke Syam. Ketika kaum Quraisy menekan dakwah, ia melindungi Nabi walaupun menanggung boikot dan tekanan sosial.",
      "Pelindung dakwah Nabi pada masa awal di Makkah. Ayah dari Ali, Ja’far, dan Aqil.",
      "Kesetiaan melindungi keluarga dan keberanian menghadapi tekanan.",
      "Menurut riwayat yang sahih, Abu Thalib wafat dalam keadaan belum memeluk Islam. Ia wafat pada tahun kesepuluh kenabian, yang dikenal sebagai Tahun Kesedihan."),
    t("hamzah", "keluarga", "Hamzah bin Abdul Muthalib", "Paman Nabi Muhammad SAW sekaligus saudara sepersusuan",
      "Paman Nabi yang usianya sebaya dengan beliau. Keduanya pernah disusui oleh Tsuwaibah. Ia dikenal gagah, pemburu ulung, dan dihormati kaumnya.",
      "Hamzah masuk Islam pada masa awal dakwah setelah marah mendengar Nabi dihina Abu Jahal. Ia ikut perang Badar dan gugur sebagai syuhada di perang Uhud pada tahun 3 H.",
      "Pembela Nabi dan pejuang di barisan terdepan. Dijuluki Asadullah (Singa Allah) dan Sayyidusy Syuhada.",
      "Keberanian membela kebenaran dan keteguhan menerima Islam.",
      ""),
    t("abbas", "keluarga", "Abbas bin Abdul Muthalib", "Paman Nabi Muhammad SAW",
      "Paman Nabi yang usianya hanya beberapa tahun lebih tua dari beliau. Ia pedagang kaya yang mengurus penyediaan air minum bagi jamaah haji.",
      "Ia hadir saat Baiat Aqabah kedua mendampingi Nabi, lalu ikut dalam Fathu Makkah. Ia wafat di Madinah sekitar tahun 32 H dan dimakamkan di Baqi’.",
      "Pendukung Nabi dan ayah dari ulama besar Abdullah bin Abbas. Dari keturunannya kelak lahir Bani Abbasiyah.",
      "Dermawan dan menjaga hubungan kekerabatan.",
      "Para ulama berbeda pendapat tentang kapan tepatnya Abbas masuk Islam. Ada yang menyebut sebelum Badar, ada yang menyebut menjelang Fathu Makkah."),
    t("abu-lahab", "keluarga", "Abu Lahab (Abdul Uzza bin Abdul Muthalib)", "Paman Nabi Muhammad SAW",
      "Salah satu paman Nabi yang berkedudukan dan berharta. Julukan “Abu Lahab” berarti pemilik api yang bernyala.",
      "Ia menentang dakwah Nabi secara terang-terangan dan mengganggu beliau. Allah menurunkan Surah Al-Lahab tentang dirinya. Ia wafat tidak lama setelah perang Badar dalam keadaan kafir.",
      "Contoh paman yang menentang dakwah. Kisahnya menunjukkan bahwa hubungan darah tidak menjamin hidayah.",
      "Pelajaran agar tidak menolak kebenaran karena gengsi dan kepentingan dunia.",
      ""),

    /* ===== ISTRI ===== */
    t("khadijah", "istri", "Khadijah binti Khuwailid", "Istri pertama Nabi Muhammad SAW",
      "Wanita Quraisy terhormat dan pedagang sukses. Ia dijuluki Ath-Thahirah (yang suci).",
      "Khadijah mempekerjakan Muhammad muda untuk berdagang, lalu menikah dengan beliau. Saat wahyu pertama turun, ia menenangkan Nabi dan menjadi orang pertama yang beriman. Ia wafat pada tahun kesepuluh kenabian, tiga tahun sebelum hijrah.",
      "Pendukung utama dakwah dengan jiwa dan harta. Ibu dari semua anak Nabi kecuali Ibrahim.",
      "Setia, bijak, dermawan, dan menjadi penenang dalam masa sulit.",
      ""),
    t("saudah", "istri", "Saudah binti Zam’ah", "Istri Nabi Muhammad SAW",
      "Wanita Quraisy yang memeluk Islam di Makkah dan ikut hijrah ke Habasyah bersama suaminya, Sakran bin Amr.",
      "Setelah suaminya wafat, Nabi menikahinya pada masa duka sepeninggal Khadijah. Ia merawat rumah tangga Nabi dan anak-anak beliau. Ketika usianya menua, ia merelakan gilirannya untuk Aisyah.",
      "Pengurus rumah tangga Nabi pada masa-masa sulit di Makkah.",
      "Rendah hati, ikhlas, dan mendahulukan kebahagiaan orang lain.",
      "Tahun wafatnya diriwayatkan berbeda; ada yang menyebut akhir masa Umar, ada yang menyebut sekitar 54 H."),
    t("aisyah", "istri", "Aisyah binti Abu Bakar", "Istri Nabi Muhammad SAW, putri Abu Bakar",
      "Putri Abu Bakar Ash-Shiddiq dan Ummu Ruman. Ia tumbuh di keluarga yang pertama kali beriman.",
      "Ia menikah dengan Nabi di Makkah dan mulai tinggal serumah di Madinah. Banyak wahyu dan peristiwa penting terjadi di rumahnya. Nabi wafat di pangkuannya. Sesudah itu ia mengajar para sahabat dan tabiin.",
      "Salah satu perawi hadits terbanyak (sekitar 2.210 hadits) dan ahli fikih di kalangan sahabat.",
      "Cerdas, haus ilmu, dan berani menyampaikan pengetahuan.",
      "Ia wafat sekitar tahun 57–58 H di Madinah."),
    t("hafshah", "istri", "Hafshah binti Umar bin Khattab", "Istri Nabi Muhammad SAW, putri Umar",
      "Putri Umar bin Khattab. Ia dikenal cerdas, bisa membaca dan menulis. Suaminya, Khunais bin Hudzafah, wafat setelah perang Badar.",
      "Nabi menikahinya sekitar tahun 3 H. Pada masa Abu Bakar, lembaran-lembaran Al-Qur’an yang dihimpun disimpan olehnya, dan kemudian menjadi rujukan saat Utsman menyusun mushaf.",
      "Penjaga naskah awal Al-Qur’an yang terhimpun.",
      "Ahli ibadah, rajin berpuasa dan shalat malam.",
      "Tahun wafatnya diriwayatkan berbeda, kira-kira pada kisaran 41–45 H."),
    t("zainab-khuzaimah", "istri", "Zainab binti Khuzaimah", "Istri Nabi Muhammad SAW",
      "Wanita dari Bani Hilal yang dijuluki Ummul Masakin (ibu orang-orang miskin) karena kasih sayangnya kepada mereka.",
      "Suaminya gugur dalam perang. Nabi menikahinya sekitar tahun 3 H. Ia wafat dalam waktu singkat setelah pernikahan, ketika Nabi masih hidup.",
      "Dikenal karena kepeduliannya kepada fakir miskin.",
      "Suka bersedekah dan berbagi dengan orang yang membutuhkan.",
      "Lama pernikahan hingga wafatnya diriwayatkan berbeda, yakni beberapa bulan hingga sekitar dua tahun."),
    t("ummu-salamah", "istri", "Ummu Salamah (Hindun binti Abu Umayyah)", "Istri Nabi Muhammad SAW",
      "Wanita Bani Makhzum yang ikut hijrah ke Habasyah dan kemudian ke Madinah bersama suaminya, Abu Salamah.",
      "Abu Salamah wafat setelah luka dari perang Uhud. Nabi menikahi Ummu Salamah sekitar tahun 4 H dan ikut mengasuh anak-anaknya. Saat Perjanjian Hudaibiyah, sarannya agar Nabi menyembelih hewan dan bercukur lebih dahulu menenangkan para sahabat.",
      "Penasihat yang bijak dan perawi hadits.",
      "Sabar menghadapi musibah dan tajam dalam memberi pertimbangan.",
      "Menurut pendapat yang masyhur, ia istri Nabi yang wafat paling akhir, antara sekitar 59–62 H."),
    t("zainab-jahsy", "istri", "Zainab binti Jahsy", "Istri Nabi Muhammad SAW, sepupu Nabi",
      "Putri Umaimah binti Abdul Muthalib, jadi masih sepupu Nabi. Ia mahir menyamak kulit dan hasilnya disedekahkan.",
      "Ia semula dinikahkan dengan Zaid bin Haritsah. Setelah keduanya berpisah, Allah memerintahkan Nabi menikahinya (QS. Al-Ahzab: 37) untuk menghapus anggapan lama tentang anak angkat. Ayat hijab turun di sekitar masa pernikahannya.",
      "Teladan kedermawanan di antara para istri Nabi.",
      "Dermawan, pekerja keras, dan rajin ibadah.",
      "Tahun pernikahannya diriwayatkan berbeda (sekitar 3–5 H). Ia wafat sekitar tahun 20 H, istri pertama yang wafat setelah Nabi."),
    t("juwairiyah", "istri", "Juwairiyah binti Al-Harits", "Istri Nabi Muhammad SAW",
      "Putri pemimpin Bani Musthaliq. Ia tertawan dalam peristiwa Bani Musthaliq (sekitar 5–6 H).",
      "Nabi menebus kebebasannya lalu menikahinya. Setelah itu para sahabat membebaskan tawanan lain karena kini mereka menjadi kerabat Nabi, dan banyak keluarga Bani Musthaliq masuk Islam.",
      "Pernikahannya membawa kebebasan bagi banyak tawanan.",
      "Rajin berzikir dan beribadah.",
      "Ia wafat sekitar tahun 50-an H dengan tahun yang berbeda dalam riwayat."),
    t("ummu-habibah", "istri", "Ummu Habibah (Ramlah binti Abu Sufyan)", "Istri Nabi Muhammad SAW",
      "Putri Abu Sufyan, pemimpin Quraisy yang saat itu masih memusuhi Islam. Ramlah memeluk Islam dan hijrah ke Habasyah.",
      "Di Habasyah suaminya murtad dan ia tetap teguh berislam. Nabi kemudian menikahinya melalui perantaraan Raja Najasyi. Ia wafat sekitar tahun 44 H.",
      "Teladan keteguhan iman walau berbeda keyakinan dengan keluarga.",
      "Mendahulukan iman di atas ikatan keluarga dan kenyamanan.",
      ""),
    t("shafiyah", "istri", "Shafiyah binti Huyay", "Istri Nabi Muhammad SAW",
      "Putri pemimpin Bani Nadhir dari keturunan Nabi Harun AS. Ia ditawan setelah penaklukan Khaibar pada tahun 7 H.",
      "Nabi memerdekakannya, dan ia memilih masuk Islam lalu menikah dengan beliau. Ia pernah mendengar ejekan karena latar belakangnya, dan Nabi menguatkannya dengan menyebut garis keturunannya yang mulia.",
      "Perawi hadits dan wanita yang mendapat perlindungan dan kehormatan di rumah Nabi.",
      "Sabar menghadapi cemoohan dan lemah lembut.",
      "Ia wafat sekitar tahun 50 H."),
    t("maimunah", "istri", "Maimunah binti Al-Harits", "Istri Nabi Muhammad SAW",
      "Saudari Ummul Fadhl, istri Abbas. Ia juga bibi dari Khalid bin Walid dan Abdullah bin Abbas.",
      "Nabi menikahinya pada umrah qadha tahun 7 H. Ia dikenal sebagai istri yang dinikahi paling akhir menurut banyak ulama. Ia wafat sekitar tahun 51 H di Sarif, tempat ia menikah dengan Nabi.",
      "Menjaga hubungan baik antara keluarga Nabi dan sahabat, serta meriwayatkan hadits.",
      "Takwa dan menjaga silaturahmi.",
      "Tahun wafatnya diriwayatkan berbeda. Selain para istri ini, Mariyah Al-Qibthiyyah juga ibu Ibrahim; ulama berbeda pendapat apakah ia berstatus istri atau hamba sahaya yang dimerdekakan."),

    /* ===== ANAK ===== */
    t("al-qasim", "anak", "Al-Qasim bin Muhammad", "Putra pertama Nabi",
      "Lahir di Makkah dari Khadijah sebelum kenabian. Nabi dijuluki Abul Qasim (ayah Qasim) dari namanya.",
      "Al-Qasim wafat saat masih kecil, sekitar usia dua tahun.",
      "Menjadi sumber kunyah Nabi, Abul Qasim.",
      "Kesabaran orang tua saat kehilangan anak.",
      "Tahun wafatnya diriwayatkan berbeda, apakah sebelum atau sesudah kenabian."),
    t("abdullah-putra", "anak", "Abdullah bin Muhammad", "Putra Nabi dari Khadijah",
      "Lahir setelah kenabian dan dikenal dengan gelar At-Thayyib dan At-Thahir.",
      "Ia wafat saat masih kecil di Makkah. Kaum Quraisy sempat mengejek Nabi karena tidak memiliki putra yang hidup, lalu turun Surah Al-Kautsar sebagai penghibur.",
      "Kisahnya menjadi latar penghiburan Allah kepada Nabi.",
      "Ketabahan dan keyakinan pada janji Allah.",
      "Sebagian ulama menyebut At-Thayyib dan At-Thahir sebagai dua putra yang berbeda."),
    t("zainab-putri", "anak", "Zainab binti Muhammad", "Putri tertua Nabi",
      "Putri Nabi dan Khadijah. Ia menikah dengan Abul Ash bin Ar-Rabi’.",
      "Ia tetap di Makkah ketika Nabi hijrah karena suaminya belum Muslim. Setelah perang Badar, ia mengirim kalung milik ibunya sebagai tebusan suaminya. Abul Ash kemudian masuk Islam dan keduanya berkumpul kembali. Zainab wafat tahun 8 H.",
      "Menjadi teladan kesetiaan dalam keluarga.",
      "Setia dan sabar menghadapi perpisahan karena perbedaan keyakinan.",
      ""),
    t("ruqayyah", "anak", "Ruqayyah binti Muhammad", "Putri Nabi",
      "Putri Nabi dan Khadijah. Ia menikah dengan Utsman bin Affan.",
      "Bersama Utsman ia hijrah ke Habasyah, lalu ke Madinah. Ia wafat pada tahun 2 H ketika perang Badar sedang terjadi. Utsman tinggal merawatnya atas perintah Nabi dan tetap mendapat bagian pahala Badar.",
      "Termasuk muhajirin pertama yang berhijrah dua kali.",
      "Sabar dalam hijrah dan penderitaan.",
      ""),
    t("ummu-kultsum", "anak", "Ummu Kultsum binti Muhammad", "Putri Nabi",
      "Putri Nabi dan Khadijah. Ia dinikahi Utsman bin Affan setelah Ruqayyah wafat.",
      "Karena menikahi dua putri Nabi secara berurutan, Utsman dijuluki Dzun Nurain (pemilik dua cahaya). Ummu Kultsum wafat pada tahun 9 H.",
      "Menjaga ikatan keluarga Nabi dengan sahabat dekatnya.",
      "Penuh kesabaran dan rendah hati.",
      ""),
    t("fatimah", "anak", "Fatimah Az-Zahra binti Muhammad", "Putri bungsu Nabi",
      "Lahir di Makkah dari Khadijah, tumbuh dalam kesederhanaan. Ia menikah dengan Ali bin Abi Thalib.",
      "Ia melahirkan Hasan, Husain, Zainab, dan Ummu Kultsum. Ia hidup sederhana dan mengerjakan urusan rumah sendiri. Ia wafat sekitar enam bulan setelah wafatnya Nabi.",
      "Ibu dari keturunan Nabi dan salah satu wanita termulia dalam Islam.",
      "Sederhana, taat beribadah, dan berbakti kepada ayahnya.",
      ""),
    t("ibrahim", "anak", "Ibrahim bin Muhammad", "Putra Nabi dari Mariyah Al-Qibthiyyah",
      "Lahir di Madinah pada tahun 8 H dari Mariyah Al-Qibthiyyah. Nabi sangat gembira dengan kelahirannya.",
      "Ia wafat saat masih bayi, sekitar usia satu setengah tahun. Nabi menangis, tetapi tetap rida kepada ketetapan Allah. Ketika terjadi gerhana matahari pada hari itu, Nabi menegaskan bahwa gerhana bukan karena wafatnya seseorang.",
      "Menjadi kesempatan Nabi mengajarkan kesabaran dan meluruskan keyakinan keliru.",
      "Boleh bersedih karena kehilangan, tetapi tetap bersabar dan tidak menyalahkan takdir.",
      ""),

    /* ===== KERABAT ===== */
    t("jafar", "kerabat", "Ja’far bin Abi Thalib", "Sepupu Nabi Muhammad SAW",
      "Putra Abu Thalib dan saudara Ali. Dikenal berwajah dan berakhlak mulia.",
      "Ia memimpin hijrah ke Habasyah dan berbicara di hadapan Raja Najasyi tentang ajaran Islam. Ia gugur sebagai syahid dalam perang Mu’tah tahun 8 H.",
      "Juru bicara kaum Muslimin di Habasyah dan panglima Mu’tah.",
      "Berani, fasih, dan teguh mempertahankan iman.",
      "Dijuluki Dzul Janahain (pemilik dua sayap) dan Ath-Thayyar, berdasarkan riwayat tentang kemuliaannya di surga."),
    t("shafiyyah-bibi", "kerabat", "Shafiyyah binti Abdul Muthalib", "Bibi Nabi Muhammad SAW",
      "Saudari Hamzah dan ibu Zubair bin Awwam. Ia memeluk Islam dan hijrah ke Madinah.",
      "Ia ikut di Uhud untuk membantu dan melihat saudaranya Hamzah gugur dengan sabar. Pada perang Khandaq, ia berhasil menggagalkan seorang mata-mata di benteng.",
      "Salah satu bibi Nabi yang masuk Islam dan berjuang bersama kaum Muslimin.",
      "Berani dan tabah dalam menghadapi musibah.",
      "Ia wafat sekitar tahun 20 H."),
    t("ibnu-abbas", "kerabat", "Abdullah bin Abbas", "Sepupu Nabi Muhammad SAW, putra Abbas",
      "Lahir tiga tahun sebelum hijrah. Ia masih belia saat Nabi wafat, namun sangat rajin belajar dari beliau dan para sahabat senior.",
      "Nabi mendoakannya agar dipahamkan agama dan diajarkan takwil. Ia kemudian menjadi rujukan tafsir Al-Qur’an dan fikih.",
      "Ulama umat dan penerjemah Al-Qur’an. Dijuluki Hibrul Ummah dan Tarjumanul Qur’an.",
      "Tekun menuntut ilmu dan rendah hati dalam belajar.",
      "Ia wafat sekitar tahun 68 H di Thaif."),
    t("hasan", "kerabat", "Hasan bin Ali bin Abi Thalib", "Cucu Nabi Muhammad SAW",
      "Putra Ali dan Fatimah, lahir di Madinah pada tahun 3 H. Nabi sering menggendong dan menyayanginya.",
      "Setelah Ali wafat, ia dibaiat sebagai khalifah. Beberapa bulan kemudian, demi mencegah pertumpahan darah, ia berdamai dengan Muawiyah (tahun 41 H, dikenal sebagai Amul Jama’ah).",
      "Pendamai di tengah perpecahan umat.",
      "Lembut, dermawan, dan mengutamakan persatuan.",
      "Ia wafat sekitar tahun 49–50 H di Madinah."),
    t("husain", "kerabat", "Husain bin Ali bin Abi Thalib", "Cucu Nabi Muhammad SAW",
      "Putra Ali dan Fatimah, lahir sekitar tahun 4 H. Ia dan Hasan disebut sebagai pemuda ahli surga dalam sabda Nabi.",
      "Ia menolak membaiat Yazid bin Muawiyah. Dalam perjalanannya ke Kufah, rombongannya dihadang di Karbala dan ia gugur pada 10 Muharram 61 H.",
      "Tokoh keluarga Nabi yang gigih memegang prinsip.",
      "Berani menyuarakan kebenaran dan sabar menghadapi cobaan.",
      ""),
    t("halimah", "kerabat", "Halimah As-Sa’diyah", "Ibu susu Nabi Muhammad SAW",
      "Wanita dari Bani Sa’ad yang datang ke Makkah mencari bayi untuk disusui.",
      "Meski awalnya enggan karena Muhammad adalah anak yatim, ia menerimanya dan merasakan banyak keberkahan. Nabi tinggal bersamanya di pedesaan hingga sekitar usia empat atau lima tahun.",
      "Menyusui dan mengasuh Nabi pada masa kecil di lingkungan yang sehat dan bahasa Arab yang fasih.",
      "Kasih sayang kepada anak yatim dan keikhlasan dalam mengasuh.",
      "Kisah detail Halimah sebagian bersumber dari riwayat sirah, dan kualitas sanadnya berbeda-beda."),

    /* ===== SAHABAT ===== */
    t("abu-bakar", "sahabat", "Abu Bakar Ash-Shiddiq (Abdullah bin Abi Quhafah)", "Sahabat terdekat, mertua, dan khalifah pertama",
      "Pedagang Quraisy yang jujur dan dermawan. Ia salah seorang yang pertama memeluk Islam di kalangan laki-laki dewasa.",
      "Ia menemani Nabi dalam hijrah dan bersembunyi di Gua Tsur. Ia memerdekakan banyak budak yang disiksa, seperti Bilal. Sesudah Nabi wafat, ia menjadi khalifah (11–13 H), memerangi kemurtadan dan nabi palsu, serta memerintahkan penghimpunan Al-Qur’an.",
      "Khalifah pertama dan penegak persatuan umat setelah wafatnya Nabi.",
      "Jujur, sangat dermawan, tegas dalam kebenaran, dan lembut hati.",
      "Wafat tahun 13 H (634 M)."),
    t("umar", "sahabat", "Umar bin Khattab", "Sahabat, mertua, dan khalifah kedua",
      "Pemuda Quraisy yang kuat dan disegani. Ia masuk Islam sekitar tahun 6 kenabian dan sejak itu kaum Muslimin lebih berani berdakwah terbuka.",
      "Sebagai khalifah (13–23 H), ia memperluas wilayah Islam hingga Syam, Mesir, dan Persia, membentuk administrasi negara, dan menetapkan penanggalan Hijriah. Ia dikenal berpatroli malam untuk memeriksa rakyatnya.",
      "Pemimpin yang adil dan administrator ulung.",
      "Adil, sederhana, dan takut kepada Allah. Digelari Al-Faruq (pembeda antara yang hak dan batil).",
      "Wafat syahid tahun 23 H setelah ditikam saat shalat Subuh."),
    t("utsman", "sahabat", "Utsman bin Affan", "Sahabat, menantu, dan khalifah ketiga",
      "Saudagar kaya dari Bani Umayyah yang pemalu dan sangat dermawan. Ia menikahi dua putri Nabi, sehingga digelari Dzun Nurain.",
      "Ia membeli sumur Rumah untuk umat Muslimin, membiayai pasukan Tabuk, dan memperluas Masjid Nabawi. Sebagai khalifah (23–35 H), ia menyatukan mushaf dalam satu bacaan baku. Di akhir masa jabatannya, ia dikepung pemberontak.",
      "Khalifah yang menyatukan umat pada satu mushaf Al-Qur’an.",
      "Dermawan, pemalu, dan sabar menghadapi fitnah.",
      "Wafat syahid tahun 35 H di rumahnya, Madinah."),
    t("ali", "sahabat", "Ali bin Abi Thalib", "Sepupu, menantu, dan khalifah keempat",
      "Putra Abu Thalib yang diasuh Nabi sejak kecil. Ia termasuk yang paling awal memeluk Islam di kalangan anak-anak.",
      "Pada malam hijrah ia tidur di tempat tidur Nabi demi menyamarkan kepergian beliau. Ia aktif di berbagai peperangan dan menikah dengan Fatimah. Sebagai khalifah (35–40 H), ia menghadapi masa penuh perselisihan.",
      "Pejuang, ahli hukum, dan khalifah keempat.",
      "Berani, berilmu, zuhud, dan tegas dalam keadilan.",
      "Wafat tahun 40 H setelah diserang oleh Abdurrahman bin Muljam."),
    t("bilal", "sahabat", "Bilal bin Rabah", "Sahabat dan muazin pertama",
      "Berasal dari Habasyah, ia hidup sebagai budak milik Umayyah bin Khalaf di Makkah.",
      "Ia disiksa di bawah terik matahari agar meninggalkan Islam, tetapi tetap mengucap “Ahad, Ahad”. Abu Bakar membebaskannya. Di Madinah ia menjadi muazin pertama dan mengumandangkan azan di atas Ka’bah saat Fathu Makkah.",
      "Muazin Rasulullah SAW yang dikenal bersuara lantang dan merdu.",
      "Keteguhan iman, kesabaran, dan kesetaraan derajat manusia di sisi Allah.",
      "Ia wafat di Syam; tahunnya diriwayatkan berbeda, kira-kira sekitar 17–21 H."),
    t("khalid", "sahabat", "Khalid bin Walid", "Sahabat dan panglima perang",
      "Pemuda Quraisy ahli strategi yang memimpin pasukan Quraisy pada perang Uhud. Ia masuk Islam sekitar tahun 7–8 H.",
      "Dalam perang Mu’tah, ia mengambil alih komando dan menyelamatkan pasukan Muslim. Nabi menjulukinya Saifullah (pedang Allah). Ia kemudian memimpin penaklukan di Irak dan Syam, termasuk Pertempuran Yarmuk.",
      "Panglima kaum Muslimin yang tidak terkalahkan dalam banyak pertempuran.",
      "Pandai strategi, berani, dan siap mengabdi di bawah pimpinan siapa pun.",
      "Wafat sekitar tahun 21 H di Himsh (Suriah), di atas tempat tidur."),
    t("abdurrahman-auf", "sahabat", "Abdurrahman bin Auf", "Sahabat, saudagar, dan salah satu dari sepuluh sahabat yang dijamin surga",
      "Pedagang Quraisy yang masuk Islam sangat awal. Ia berhijrah ke Habasyah dan kemudian ke Madinah.",
      "Di Madinah ia memilih berdagang di pasar dan cepat sukses, lalu banyak menyedekahkan hartanya. Ia termasuk anggota majelis syura yang memilih khalifah setelah Umar.",
      "Penopang ekonomi umat dan donatur perjuangan Islam.",
      "Dermawan, jujur dalam berniaga, dan tidak sombong dengan hartanya.",
      "Wafat sekitar tahun 32 H di Madinah."),
    t("saad", "sahabat", "Sa’ad bin Abi Waqqash", "Sahabat dan salah satu dari sepuluh sahabat yang dijamin surga",
      "Dari Bani Zuhrah, kerabat dari pihak ibu Nabi. Ia masuk Islam saat masih muda.",
      "Ia dikenal sebagai orang pertama yang melepaskan anak panah di jalan Allah, dan doanya mudah dikabulkan. Pada masa Umar ia memimpin pasukan dalam Pertempuran Qadisiyah melawan Persia dan kemudian mendirikan kota Kufah.",
      "Panglima penakluk Persia.",
      "Berbakti kepada ibu, pemberani, dan doanya mustajab.",
      "Wafat sekitar tahun 55 H (ada riwayat 50–58 H)."),
    t("abu-ubaidah", "sahabat", "Abu Ubaidah bin Al-Jarrah", "Sahabat dan salah satu dari sepuluh sahabat yang dijamin surga",
      "Nama aslinya Amir bin Abdillah. Ia masuk Islam pada masa awal dan berhijrah ke Habasyah serta Madinah.",
      "Nabi menjulukinya Amin Hadzihil Ummah (orang kepercayaan umat ini). Pada masa Umar ia memimpin penaklukan Syam. Ketika wabah Amwas melanda, ia memilih tetap bersama pasukannya hingga wafat.",
      "Panglima penakluk Syam dan pemimpin yang amanah.",
      "Amanah, rendah hati, dan peduli pada rakyatnya.",
      "Wafat tahun 18 H dalam wabah Amwas."),
    t("thalhah", "sahabat", "Thalhah bin Ubaidillah", "Sahabat dan salah satu dari sepuluh sahabat yang dijamin surga",
      "Pedagang Quraisy dari Bani Taim, satu kabilah dengan Abu Bakar. Ia masuk Islam melalui dakwah Abu Bakar.",
      "Dalam perang Uhud ia melindungi Nabi dengan tubuhnya hingga tangannya cedera. Karena itu Nabi menyebutnya sebagai orang yang wajib mendapat surga. Ia dikenal Thalhatul Khair (Thalhah yang dermawan).",
      "Pelindung Nabi di Uhud.",
      "Berani membela Rasulullah dan dermawan.",
      "Wafat tahun 36 H dalam perang Jamal."),
    t("zubair", "sahabat", "Zubair bin Awwam", "Sahabat, sepupu Nabi, dan salah satu dari sepuluh sahabat yang dijamin surga",
      "Putra Shafiyyah binti Abdul Muthalib, jadi keponakan Nabi dari jalur bibi. Ia masuk Islam saat masih sangat muda.",
      "Ia hijrah ke Habasyah dan Madinah, serta ikut hampir semua peperangan bersama Nabi. Nabi menyebutnya hawari (pengikut setia) beliau.",
      "Pejuang pemberani dan berkorban harta di jalan Allah.",
      "Berani, setia, dan dermawan.",
      "Wafat tahun 36 H setelah perang Jamal."),
    t("salman", "sahabat", "Salman Al-Farisi", "Sahabat dari Persia",
      "Lahir di Persia dan semula beragama Majusi, kemudian mencari kebenaran dari satu pendeta ke pendeta lain hingga bertemu Nabi di Madinah.",
      "Saat kaum Quraisy dan sekutunya mengepung Madinah dalam perang Khandaq (5 H), ia mengusulkan menggali parit sebagai strategi pertahanan, taktik yang belum dikenal bangsa Arab.",
      "Pemberi ide strategi parit dan teladan pencari kebenaran.",
      "Tekun mencari ilmu dan sederhana dalam hidup.",
      "Wafat sekitar tahun 35–36 H di Mada’in."),
    t("musab", "sahabat", "Mus’ab bin Umair", "Sahabat dan duta Islam pertama ke Madinah",
      "Pemuda Makkah dari keluarga kaya yang hidup bermewah-mewahan, kemudian meninggalkan kemewahan demi Islam.",
      "Nabi mengutusnya ke Madinah untuk mengajarkan Islam setelah Baiat Aqabah pertama. Dakwahnya berhasil membuka hati banyak pemuka Madinah. Pada perang Uhud ia membawa panji dan gugur sebagai syahid.",
      "Duta dakwah pertama dalam Islam.",
      "Rela meninggalkan kemewahan demi iman dan menjadi teladan para pemuda.",
      "Wafat syahid di perang Uhud, tahun 3 H."),
    t("ammar", "sahabat", "Ammar bin Yasir", "Sahabat dari keluarga yang disiksa karena imannya",
      "Putra Yasir dan Sumayyah. Keluarganya termasuk golongan awal yang memeluk Islam dan sangat disiksa Quraisy.",
      "Ibunya, Sumayyah, dikenal sebagai syahidah pertama dalam Islam. Ammar kemudian ikut hijrah dan banyak berperan dalam peperangan. Nabi menyebutnya orang yang dipenuhi keimanan.",
      "Pejuang yang teguh meski berasal dari kalangan yang lemah dan tertindas.",
      "Sabar menghadapi siksaan dan teguh memegang agama.",
      "Wafat tahun 37 H dalam perang Shiffin."),
    t("abu-hurairah", "sahabat", "Abu Hurairah (Abdurrahman bin Shakhr)", "Sahabat dan perawi hadits terbanyak",
      "Berasal dari suku Daus di Yaman. Ia masuk Islam dan bertemu Nabi sekitar tahun 7 H, saat Khaibar.",
      "Ia menetap di Masjid Nabawi bersama Ahlus Suffah dan hampir selalu mendampingi Nabi. Ia mencatat dan menghafal banyak hadits dan menyampaikannya kepada generasi sesudahnya.",
      "Perawi hadits terbanyak, yakni sekitar 5.374 hadits menurut hitungan ulama.",
      "Semangat belajar, kuat hafalan, dan berbakti pada ibunya.",
      "Nama aslinya diperselisihkan, namun pendapat yang masyhur adalah Abdurrahman bin Shakhr. Ia wafat sekitar tahun 57–59 H."),
  ];

  /* ---------- 3. Data soal kuis ---------- */
  // s(kategori, soal, [A,B,C,D], indeksJawabanBenar, pembahasan)
  const s = (k, q, o, a, p) => ({ k, q, o, a, p });

  const SOAL = [
    s("keluarga", "Siapakah ayah Nabi Muhammad SAW?", ["Abu Thalib", "Abdullah bin Abdul Muthalib", "Abbas bin Abdul Muthalib", "Hamzah bin Abdul Muthalib"], 1, "Ayah Nabi adalah Abdullah bin Abdul Muthalib. Abu Thalib, Abbas, dan Hamzah adalah paman beliau."),
    s("keluarga", "Ibu Nabi Muhammad SAW berasal dari Bani Zuhrah. Siapa namanya?", ["Khadijah binti Khuwailid", "Fatimah binti Asad", "Aminah binti Wahb", "Halimah As-Sa’diyah"], 2, "Ibu Nabi adalah Aminah binti Wahb. Halimah adalah ibu susu, bukan ibu kandung."),
    s("keluarga", "Siapa yang mengasuh Nabi setelah kakeknya, Abdul Muthalib, wafat?", ["Abu Lahab", "Abbas", "Hamzah", "Abu Thalib"], 3, "Abu Thalib mengasuh Nabi setelah Abdul Muthalib wafat dan melindungi dakwah beliau."),
    s("keluarga", "Paman Nabi yang digelari Asadullah (Singa Allah) dan gugur di perang Uhud adalah…", ["Abu Thalib", "Hamzah bin Abdul Muthalib", "Abbas bin Abdul Muthalib", "Abu Lahab"], 1, "Hamzah bin Abdul Muthalib gugur sebagai syahid di Uhud dan dijuluki Sayyidusy Syuhada."),
    s("keluarga", "Surah Al-Lahab diturunkan berkaitan dengan paman Nabi yang bernama…", ["Abu Lahab", "Abu Thalib", "Abbas", "Hamzah"], 0, "Surah Al-Lahab berkaitan dengan Abu Lahab (Abdul Uzza bin Abdul Muthalib) yang menentang dakwah Nabi."),
    s("istri", "Siapakah istri pertama Nabi Muhammad SAW?", ["Aisyah binti Abu Bakar", "Saudah binti Zam’ah", "Khadijah binti Khuwailid", "Hafshah binti Umar"], 2, "Khadijah binti Khuwailid adalah istri pertama Nabi dan orang pertama yang beriman."),
    s("istri", "Istri Nabi yang merupakan putri Abu Bakar Ash-Shiddiq adalah…", ["Hafshah", "Aisyah", "Ummu Salamah", "Maimunah"], 1, "Aisyah adalah putri Abu Bakar, sedangkan Hafshah putri Umar bin Khattab."),
    s("istri", "Istri Nabi yang dijuluki Ummul Masakin (ibu orang-orang miskin) adalah…", ["Zainab binti Jahsy", "Juwairiyah binti Al-Harits", "Zainab binti Khuzaimah", "Shafiyah binti Huyay"], 2, "Zainab binti Khuzaimah dijuluki Ummul Masakin karena kasih sayangnya kepada orang miskin."),
    s("istri", "Istri Nabi yang berasal dari Bani Musthaliq dan pernikahannya menjadi sebab dibebaskannya banyak tawanan adalah…", ["Juwairiyah", "Maimunah", "Ummu Habibah", "Saudah"], 0, "Setelah Nabi menikahi Juwairiyah, para sahabat membebaskan para tawanan Bani Musthaliq karena kini mereka kerabat Nabi."),
    s("istri", "Istri Nabi yang menyimpan lembaran-lembaran Al-Qur’an setelah dihimpun pada masa Abu Bakar adalah…", ["Ummu Salamah", "Aisyah", "Hafshah binti Umar", "Zainab binti Jahsy"], 2, "Lembaran Al-Qur’an yang dihimpun disimpan oleh Hafshah binti Umar, lalu menjadi rujukan Utsman."),
    s("anak", "Berapa jumlah anak Nabi Muhammad SAW?", ["Tujuh", "Lima", "Sembilan", "Empat"], 0, "Nabi memiliki tujuh anak: Al-Qasim, Abdullah, Ibrahim, Zainab, Ruqayyah, Ummu Kultsum, dan Fatimah."),
    s("anak", "Putra Nabi yang lahir dari Mariyah Al-Qibthiyyah adalah…", ["Al-Qasim", "Abdullah", "Ibrahim", "Hasan"], 2, "Ibrahim lahir di Madinah dari Mariyah Al-Qibthiyyah. Hasan adalah cucu Nabi."),
    s("anak", "Utsman bin Affan digelari Dzun Nurain karena menikahi dua putri Nabi, yaitu…", ["Zainab dan Fatimah", "Ruqayyah dan Ummu Kultsum", "Fatimah dan Ruqayyah", "Zainab dan Ummu Kultsum"], 1, "Utsman menikahi Ruqayyah, lalu setelah ia wafat menikahi Ummu Kultsum."),
    s("anak", "Putri Nabi yang menikah dengan Ali bin Abi Thalib adalah…", ["Zainab", "Ruqayyah", "Ummu Kultsum", "Fatimah Az-Zahra"], 3, "Fatimah menikah dengan Ali dan melahirkan Hasan, Husain, Zainab, dan Ummu Kultsum."),
    s("kerabat", "Ja’far bin Abi Thalib memimpin kaum Muslimin berhijrah ke…", ["Habasyah", "Thaif", "Yaman", "Syam"], 0, "Ja’far menjadi juru bicara kaum Muslimin di hadapan Raja Najasyi di Habasyah."),
    s("kerabat", "Cucu Nabi yang berdamai dengan Muawiyah demi menyatukan umat adalah…", ["Husain bin Ali", "Hasan bin Ali", "Abdullah bin Abbas", "Ja’far bin Abi Thalib"], 1, "Hasan bin Ali berdamai dengan Muawiyah pada tahun 41 H, yang dikenal sebagai Amul Jama’ah."),
    s("kerabat", "Sepupu Nabi yang digelari Hibrul Ummah dan ahli tafsir adalah…", ["Ali bin Abi Thalib", "Abdullah bin Abbas", "Ja’far bin Abi Thalib", "Zubair bin Awwam"], 1, "Abdullah bin Abbas, putra Abbas, dikenal sebagai Hibrul Ummah dan Tarjumanul Qur’an."),
    s("sahabat", "Siapakah khalifah pertama setelah Nabi wafat?", ["Umar bin Khattab", "Utsman bin Affan", "Abu Bakar Ash-Shiddiq", "Ali bin Abi Thalib"], 2, "Abu Bakar Ash-Shiddiq adalah khalifah pertama Khulafaur Rasyidin."),
    s("sahabat", "Siapakah muazin pertama dalam Islam?", ["Bilal bin Rabah", "Salman Al-Farisi", "Ammar bin Yasir", "Abu Hurairah"], 0, "Bilal bin Rabah menjadi muazin pertama di Madinah."),
    s("sahabat", "Sahabat yang dijuluki Saifullah (Pedang Allah) adalah…", ["Sa’ad bin Abi Waqqash", "Khalid bin Walid", "Zubair bin Awwam", "Thalhah bin Ubaidillah"], 1, "Khalid bin Walid dijuluki Saifullah setelah peran pentingnya dalam perang Mu’tah."),
    s("sahabat", "Duta dakwah pertama yang diutus Nabi ke Madinah adalah…", ["Mus’ab bin Umair", "Abdurrahman bin Auf", "Ali bin Abi Thalib", "Abu Ubaidah bin Al-Jarrah"], 0, "Mus’ab bin Umair diutus mengajarkan Islam ke Madinah setelah Baiat Aqabah pertama."),
    s("sahabat", "Sahabat yang mengusulkan strategi menggali parit pada perang Khandaq adalah…", ["Khalid bin Walid", "Salman Al-Farisi", "Umar bin Khattab", "Ammar bin Yasir"], 1, "Salman Al-Farisi mengusulkan menggali parit untuk mempertahankan Madinah."),
    s("sahabat", "Sahabat yang dijuluki Amin Hadzihil Ummah (kepercayaan umat ini) adalah…", ["Abu Ubaidah bin Al-Jarrah", "Abdurrahman bin Auf", "Thalhah bin Ubaidillah", "Sa’ad bin Abi Waqqash"], 0, "Nabi menyebut Abu Ubaidah bin Al-Jarrah sebagai orang kepercayaan umat."),
    s("sahabat", "Siapakah sahabat yang dikenal sebagai periwayat hadits terbanyak?", ["Abu Hurairah", "Aisyah", "Umar bin Khattab", "Abdullah bin Abbas"], 0, "Abu Hurairah meriwayatkan sekitar 5.374 hadits, jumlah terbanyak di antara sahabat."),
    s("sahabat", "Khalifah yang menetapkan penanggalan Hijriah adalah…", ["Abu Bakar", "Utsman bin Affan", "Umar bin Khattab", "Ali bin Abi Thalib"], 2, "Umar bin Khattab menetapkan awal kalender Hijriah dari peristiwa hijrah Nabi."),
    s("sahabat", "Sumayyah, syahidah pertama dalam Islam, adalah ibu dari sahabat…", ["Bilal", "Mus’ab bin Umair", "Ammar bin Yasir", "Salman Al-Farisi"], 2, "Sumayyah adalah ibu Ammar bin Yasir; keluarganya disiksa karena mempertahankan iman."),
  ];

  /* ---------- 4. Kutipan motivasi ---------- */
  const KUTIPAN = [
    ["Allah mengangkat derajat orang-orang yang beriman dan berilmu di antara kalian.", "Makna QS. Al-Mujadilah: 11"],
    ["Apakah sama orang yang mengetahui dengan orang yang tidak mengetahui?", "Makna QS. Az-Zumar: 9"],
    ["Wahai Tuhanku, tambahkanlah ilmu kepadaku.", "QS. Thaha: 114 (makna)"],
  ];

  /* ---------- 5. Penyimpanan (Local Storage) ---------- */
  const KEY_BACA = "sbn_dibaca_v1";
  const KEY_RIWAYAT = "sbn_riwayat_v1";

  function muat(key, awal) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v == null ? awal : v;
    } catch (e) { return awal; }
  }
  function simpan(key, nilai) {
    try { localStorage.setItem(key, JSON.stringify(nilai)); } catch (e) { /* penyimpanan penuh atau diblokir */ }
  }

  let dibaca = new Set(muat(KEY_BACA, []));
  let riwayat = muat(KEY_RIWAYAT, []);

  /* ---------- 6. Navigasi antarhalaman ---------- */
  const JUDUL = {
    beranda: "Beranda", materi: "Materi Pembelajaran", keluarga: "Keluarga Nabi", istri: "Istri-Istri Nabi",
    anak: "Anak-Anak Nabi", kerabat: "Kerabat Nabi", sahabat: "Sahabat Nabi", detail: "Detail Tokoh",
    kuis: "Latihan Soal", hasil: "Hasil Nilai", tentang: "Tentang Website",
  };
  let halamanSekarang = "beranda";
  let halamanAsal = "materi";   // untuk tombol kembali di halaman detail

  function showPage(nama, simpanAsal) {
    if (!$("#page-" + nama)) nama = "beranda";
    if (nama === "detail" && simpanAsal) halamanAsal = simpanAsal;
    $$(".page").forEach((p) => { p.hidden = p.id !== "page-" + nama; });
    halamanSekarang = nama;
    const navAktif = nama === "detail" ? halamanAsal : nama;
    $$(".nav-item").forEach((b) => b.classList.toggle("aktif", b.dataset.go === navAktif));
    $("#topbar-title").textContent = JUDUL[nama] || "";
    tutupMenu();

    if (nama === "beranda") renderBeranda();
    if (nama === "materi") renderMateri();
    if (KATEGORI[nama]) renderKategori(nama);
    if (nama === "kuis") tampilKuisAwal();
    if (nama === "hasil") renderHasil();
    window.scrollTo(0, 0);
  }

  // Sidebar (HP dan tablet)
  function tutupMenu() {
    document.body.classList.remove("menu-buka");
    $("#menu-btn").setAttribute("aria-expanded", "false");
  }
  $("#menu-btn").addEventListener("click", () => {
    const buka = document.body.classList.toggle("menu-buka");
    $("#menu-btn").setAttribute("aria-expanded", String(buka));
  });
  $("#overlay").addEventListener("click", tutupMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutupMenu(); });

  // Satu pendengar klik untuk semua tombol navigasi dan kartu tokoh
  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { showPage(go.dataset.go); return; }
    const kartu = e.target.closest("[data-tokoh]");
    if (kartu) bukaDetail(kartu.dataset.tokoh, halamanSekarang);
  });

  /* ---------- 7. Progres belajar ---------- */
  function hitungProgres() {
    const total = TOKOH.length;
    const sudah = TOKOH.filter((x) => dibaca.has(x.id)).length;
    return { total, sudah, persen: total ? Math.round((sudah / total) * 100) : 0 };
  }
  function perbaruiProgres() {
    const p = hitungProgres();
    $("#side-persen").textContent = p.persen + "%";
    $("#side-bar").style.width = p.persen + "%";
    $("#materi-progress-teks").textContent = p.sudah + " dari " + p.total + " materi (" + p.persen + "%)";
    $("#materi-progress-bar").style.width = p.persen + "%";
  }

  /* ---------- 8. Beranda ---------- */
  function renderBeranda() {
    const p = hitungProgres();
    $("#st-materi").textContent = TOKOH.length;
    $("#st-kategori").textContent = Object.keys(KATEGORI).length;
    $("#st-soal").textContent = SOAL.length;
    $("#st-dibaca").textContent = p.sudah;

    $("#beranda-kategori").innerHTML = Object.keys(KATEGORI).map((k) => {
      const semua = TOKOH.filter((x) => x.kat === k);
      const baca = semua.filter((x) => dibaca.has(x.id)).length;
      return '<button class="kat-item" data-go="' + k + '"><span>' + KATEGORI[k].ikon + "</span><b>" +
        KATEGORI[k].nama + "</b><small>" + baca + "/" + semua.length + " dibaca</small></button>";
    }).join("");

    // Kutipan berganti setiap hari
    const hariKe = Math.floor(Date.now() / 86400000);
    const q = KUTIPAN[hariKe % KUTIPAN.length];
    $("#kutipan").textContent = "“" + q[0] + "”";
    $("#kutipan-sumber").textContent = q[1];
  }

  /* ---------- 9. Daftar tokoh, pencarian, dan filter ---------- */
  function kartuHTML(x) {
    const sudah = dibaca.has(x.id);
    return '<button class="card" data-tokoh="' + x.id + '">' +
      '<span class="chip">' + KATEGORI[x.kat].nama + "</span>" +
      "<h3>" + x.nama + "</h3>" +
      '<span class="hub">' + x.hubungan + "</span>" +
      (sudah ? '<span class="badge-baca">✓ Sudah dibaca</span>' : '<span class="badge-baru">Belum dibaca</span>') +
      "</button>";
  }

  function saring(kat, kata) {
    const q = norm(kata);
    return TOKOH.filter((x) => {
      if (kat && kat !== "semua" && x.kat !== kat) return false;
      if (!q) return true;
      return norm(x.nama + " " + x.hubungan + " " + KATEGORI[x.kat].nama).includes(q);
    });
  }

  function gambarDaftar(wadah, hasil) {
    wadah.innerHTML = hasil.length
      ? hasil.map(kartuHTML).join("")
      : '<div class="kosong">Tidak ada tokoh yang cocok. Coba kata kunci lain, misalnya nama atau hubungan seperti “paman”.</div>';
  }

  // Halaman kategori
  function renderKategori(kat) {
    const input = $('[data-cari="' + kat + '"]');
    gambarDaftar($("#list-" + kat), saring(kat, input ? input.value : ""));
  }
  $$("[data-cari]").forEach((el) => el.addEventListener("input", () => renderKategori(el.dataset.cari)));

  // Halaman Materi Pembelajaran (semua kategori)
  const filterMateri = $("#filter-materi");
  filterMateri.innerHTML = '<option value="semua">Semua kategori</option>' +
    Object.keys(KATEGORI).map((k) => '<option value="' + k + '">' + KATEGORI[k].nama + "</option>").join("");

  function renderMateri() {
    const hasil = saring(filterMateri.value, $("#cari-materi").value);
    $("#hitung-materi").textContent = "Menampilkan " + hasil.length + " dari " + TOKOH.length + " tokoh";
    gambarDaftar($("#list-materi"), hasil);
    perbaruiProgres();
  }
  $("#cari-materi").addEventListener("input", renderMateri);
  filterMateri.addEventListener("change", renderMateri);

  /* ---------- 10. Halaman detail tokoh ---------- */
  let tokohAktif = null;

  function bukaDetail(id, asal) {
    const x = TOKOH.find((o) => o.id === id);
    if (!x) return;
    tokohAktif = x;
    dibaca.add(x.id);
    simpan(KEY_BACA, Array.from(dibaca));
    perbaruiProgres();

    $("#detail-isi").innerHTML =
      "<header>" +
        '<span class="chip">' + KATEGORI[x.kat].nama + "</span>" +
        "<h1>" + x.nama + "</h1>" +
        '<p class="hub-besar">' + x.hubungan + "</p>" +
      "</header>" +
      "<section><h2>Latar belakang kehidupan</h2><p>" + x.latar + "</p></section>" +
      "<section><h2>Kisah singkat</h2><p>" + x.kisah + "</p></section>" +
      "<section><h2>Peran dan kontribusi</h2><p>" + x.peran + "</p></section>" +
      "<section><h2>Keteladanan</h2><p>" + x.teladan + "</p></section>" +
      (x.catatan ? '<section><div class="catatan-box"><strong>Catatan:</strong> ' + x.catatan + "</div></section>" : "");

    // Tombol tokoh sebelumnya/berikutnya dalam kategori yang sama
    const satuKategori = TOKOH.filter((o) => o.kat === x.kat);
    const i = satuKategori.indexOf(x);
    $("#btn-sebelum").disabled = i <= 0;
    $("#btn-sesudah").disabled = i >= satuKategori.length - 1;

    // Tombol kembali ke daftar yang tadi dibuka; dari detail ke detail tetap ke daftar semula
    const tujuan = asal && asal !== "detail" ? asal : halamanAsal;
    showPage("detail", tujuan);
  }

  $("#btn-kembali").addEventListener("click", () => showPage(halamanAsal));
  $("#btn-sebelum").addEventListener("click", () => geserTokoh(-1));
  $("#btn-sesudah").addEventListener("click", () => geserTokoh(1));
  function geserTokoh(arah) {
    const daftar = TOKOH.filter((o) => o.kat === tokohAktif.kat);
    const target = daftar[daftar.indexOf(tokohAktif) + arah];
    if (target) bukaDetail(target.id, halamanAsal);
  }

  /* ---------- 11. Kuis ---------- */
  let kuis = null;   // { butir, idx, akhir, durasi, timer, selesai, ... }

  function pad(n) { return String(n).padStart(2, "0"); }
  function formatWaktu(detik) { return pad(Math.floor(detik / 60)) + ":" + pad(detik % 60); }

  function tampilKuisAwal() {
    $("#kuis-jumlah").textContent = SOAL.length;
    if (kuis && !kuis.selesai) {
      // Kuis masih berjalan: kembali ke soal terakhir
      $("#kuis-setup").hidden = true;
      $("#kuis-hasil").hidden = true;
      $("#kuis-run").hidden = false;
      renderSoal();
    } else {
      $("#kuis-setup").hidden = false;
      $("#kuis-run").hidden = true;
      $("#kuis-hasil").hidden = true;
    }
  }

  function mulaiKuis(menit) {
    if (kuis && kuis.timer) clearInterval(kuis.timer);
    const butir = acak(SOAL).map((x) => {
      const opsi = acak(x.o.map((teks, i) => ({ teks, benar: i === x.a })));
      return { q: x.q, p: x.p, opsi, pilih: null, benarIdx: opsi.findIndex((o) => o.benar) };
    });
    kuis = { butir, idx: 0, durasi: menit * 60, akhir: Date.now() + menit * 60000, timer: null, selesai: false };
    $("#kuis-setup").hidden = true;
    $("#kuis-hasil").hidden = true;
    $("#kuis-run").hidden = false;
    $("#pembahasan").hidden = true;
    kuis.timer = setInterval(detak, 1000);
    detak();
    renderSoal();
  }

  function detak() {
    if (!kuis || kuis.selesai) return;
    const sisa = Math.max(0, Math.round((kuis.akhir - Date.now()) / 1000));
    const el = $("#kuis-timer");
    el.textContent = formatWaktu(sisa);
    el.classList.toggle("menipis", sisa <= 60);
    if (sisa === 0) {
      selesaiKuis(true);
    }
  }

  function renderSoal() {
    const b = kuis.butir[kuis.idx];
    const huruf = ["A", "B", "C", "D"];
    $("#kuis-nomor").textContent = "Soal " + (kuis.idx + 1) + " dari " + kuis.butir.length;
    $("#kuis-pertanyaan").textContent = b.q;
    $("#kuis-opsi").innerHTML = b.opsi.map((o, i) =>
      '<button class="opsi' + (b.pilih === i ? " dipilih" : "") + '" data-opsi="' + i + '">' +
      '<span class="huruf">' + huruf[i] + "</span><span>" + o.teks + "</span></button>").join("");
    $("#btn-prev").disabled = kuis.idx === 0;
    $("#btn-next").disabled = kuis.idx === kuis.butir.length - 1;
    $("#kuis-nomor-grid").innerHTML = kuis.butir.map((x, i) =>
      '<button class="nomor' + (x.pilih !== null ? " terjawab" : "") + (i === kuis.idx ? " sekarang" : "") +
      '" data-nomor="' + i + '" aria-label="Soal ' + (i + 1) + '">' + (i + 1) + "</button>").join("");
    detak();
  }

  $("#kuis-opsi").addEventListener("click", (e) => {
    const tombol = e.target.closest("[data-opsi]");
    if (!tombol || !kuis || kuis.selesai) return;
    kuis.butir[kuis.idx].pilih = Number(tombol.dataset.opsi);
    renderSoal();
  });
  $("#kuis-nomor-grid").addEventListener("click", (e) => {
    const tombol = e.target.closest("[data-nomor]");
    if (!tombol || !kuis || kuis.selesai) return;
    kuis.idx = Number(tombol.dataset.nomor);
    renderSoal();
  });
  $("#btn-prev").addEventListener("click", () => { if (kuis.idx > 0) { kuis.idx--; renderSoal(); } });
  $("#btn-next").addEventListener("click", () => { if (kuis.idx < kuis.butir.length - 1) { kuis.idx++; renderSoal(); } });
  $("#btn-mulai-kuis").addEventListener("click", () => mulaiKuis(Number($("#kuis-durasi").value)));

  $("#btn-selesai").addEventListener("click", () => {
    const kosong = kuis.butir.filter((x) => x.pilih === null).length;
    const pesan = kosong
      ? "Masih ada " + kosong + " soal yang belum dijawab. Selesaikan kuis sekarang?"
      : "Selesaikan kuis sekarang?";
    if (confirm(pesan)) selesaiKuis(false);
  });

  function selesaiKuis(habisWaktu) {
    if (!kuis || kuis.selesai) return;
    kuis.selesai = true;
    clearInterval(kuis.timer);

    const total = kuis.butir.length;
    const benar = kuis.butir.filter((x) => x.pilih === x.benarIdx).length;
    const salah = total - benar;                       // soal kosong dihitung salah
    const nilai = Math.round((benar / total) * 100);   // Nilai = (benar / total) x 100
    const terpakai = Math.min(kuis.durasi, Math.round((Date.now() - (kuis.akhir - kuis.durasi * 1000)) / 1000));

    riwayat.push({ tanggal: new Date().toISOString(), total, benar, salah, nilai, detik: terpakai });
    simpan(KEY_RIWAYAT, riwayat);

    let ket, info;
    if (nilai >= 90) { ket = "Mumtaz (Istimewa)"; info = "Pemahaman Anda sangat baik. Pertahankan dan bagikan ilmunya."; }
    else if (nilai >= 75) { ket = "Jayyid (Baik)"; info = "Hasil yang baik. Ulangi materi yang masih keliru agar makin kuat."; }
    else if (nilai >= 60) { ket = "Maqbul (Cukup)"; info = "Cukup baik. Baca kembali materi, terutama pada soal yang salah."; }
    else { ket = "Perlu belajar lagi"; info = "Jangan berkecil hati. Pelajari materinya lalu coba lagi."; }
    if (habisWaktu) info = "Waktu habis, kuis diselesaikan otomatis. " + info;

    $("#skor-nilai").textContent = nilai;
    $("#skor-ket").textContent = ket;
    $("#skor-info").textContent = info;
    $("#skor-total").textContent = total;
    $("#skor-benar").textContent = benar;
    $("#skor-salah").textContent = salah;
    $("#skor-persen").textContent = nilai + "%";
    $("#pembahasan").hidden = true;
    $("#btn-pembahasan").textContent = "Lihat Pembahasan";
    $("#kuis-run").hidden = true;
    $("#kuis-setup").hidden = true;
    $("#kuis-hasil").hidden = false;

    // Jika waktu habis saat pengguna di halaman lain, bawa ke halaman kuis
    if (halamanSekarang !== "kuis") showPage("kuis");
    // showPage memanggil tampilKuisAwal, jadi pastikan hasil tetap tampil
    $("#kuis-setup").hidden = true;
    $("#kuis-run").hidden = true;
    $("#kuis-hasil").hidden = false;
    window.scrollTo(0, 0);
  }

  $("#btn-ulang").addEventListener("click", () => mulaiKuis(Math.round(kuis.durasi / 60)));

  $("#btn-pembahasan").addEventListener("click", () => {
    const wadah = $("#pembahasan");
    if (wadah.hidden) {
      const huruf = ["A", "B", "C", "D"];
      wadah.innerHTML = "<h2>Pembahasan</h2>" + kuis.butir.map((b, i) => {
        const benar = b.pilih === b.benarIdx;
        const status = b.pilih === null ? "Tidak dijawab" : benar ? "✓ Benar" : "✗ Salah";
        const dipilih = b.pilih === null ? "(tidak dijawab)" : huruf[b.pilih] + ". " + b.opsi[b.pilih].teks;
        return '<div class="bahas ' + (benar ? "benar" : "salah") + '">' +
          '<div class="status">Soal ' + (i + 1) + " · " + status + "</div>" +
          "<p><strong>" + b.q + "</strong></p>" +
          "<p>Jawaban Anda: " + dipilih + "</p>" +
          "<p>Jawaban benar: " + huruf[b.benarIdx] + ". " + b.opsi[b.benarIdx].teks + "</p>" +
          '<div class="penjelasan">' + b.p + "</div></div>";
      }).join("");
      wadah.hidden = false;
      $("#btn-pembahasan").textContent = "Sembunyikan Pembahasan";
      wadah.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      wadah.hidden = true;
      $("#btn-pembahasan").textContent = "Lihat Pembahasan";
    }
  });

  /* ---------- 12. Hasil nilai & riwayat ---------- */
  function renderHasil() {
    const n = riwayat.length;
    const nilai = riwayat.map((r) => r.nilai);
    $("#h-percobaan").textContent = n;
    $("#h-tertinggi").textContent = n ? Math.max.apply(null, nilai) : 0;
    $("#h-rata").textContent = n ? Math.round(nilai.reduce((a, b) => a + b, 0) / n) : 0;
    $("#h-terakhir").textContent = n ? nilai[n - 1] : 0;

    const grafik = $("#grafik");
    const tabel = $("#tabel-riwayat");

    if (!n) {
      grafik.innerHTML = '<div class="kosong" style="width:100%">Belum ada nilai. Kerjakan latihan soal untuk melihat perkembanganmu.</div>';
      $("#grafik-ket").textContent = "";
      tabel.innerHTML = "";
      return;
    }

    // Grafik 10 kuis terakhir
    const terakhir = riwayat.slice(-10);
    grafik.innerHTML = terakhir.map((r, i) =>
      '<div class="kolom"><span class="angka">' + r.nilai + '</span><div class="batang" style="height:' +
      Math.max(r.nilai * 1.45, 4) + 'px" title="Kuis ke-' + (n - terakhir.length + i + 1) + '"></div></div>').join("");

    let ket = "Menampilkan " + terakhir.length + " kuis terakhir.";
    if (n > 1) {
      const selisih = nilai[n - 1] - nilai[n - 2];
      ket += selisih > 0 ? " Nilai terakhir naik " + selisih + " poin dari kuis sebelumnya."
        : selisih < 0 ? " Nilai terakhir turun " + Math.abs(selisih) + " poin dari kuis sebelumnya."
        : " Nilai terakhir sama dengan kuis sebelumnya.";
    }
    $("#grafik-ket").textContent = ket;

    // Tabel riwayat, terbaru di atas
    const tertinggi = Math.max.apply(null, nilai);
    tabel.innerHTML = "<thead><tr><th>No</th><th>Tanggal</th><th>Benar</th><th>Salah</th><th>Nilai</th><th>Waktu</th></tr></thead><tbody>" +
      riwayat.map((r, i) => ({ r, i })).reverse().map((o) => {
        const tgl = new Date(o.r.tanggal).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
        return "<tr><td>" + (o.i + 1) + "</td><td>" + tgl + "</td><td>" + o.r.benar + "</td><td>" + o.r.salah +
          "</td><td><strong>" + o.r.nilai + "</strong>" + (o.r.nilai === tertinggi ? " ⭐" : "") + "</td><td>" + formatWaktu(o.r.detik) + "</td></tr>";
      }).join("") + "</tbody>";
  }

  $("#btn-reset-riwayat").addEventListener("click", () => {
    if (!riwayat.length) { alert("Belum ada riwayat nilai yang bisa dihapus."); return; }
    if (confirm("Hapus seluruh riwayat nilai? Tindakan ini tidak dapat dibatalkan.")) {
      riwayat = [];
      simpan(KEY_RIWAYAT, riwayat);
      renderHasil();
    }
  });
  $("#btn-reset-progres").addEventListener("click", () => {
    if (!dibaca.size) { alert("Belum ada progres membaca yang bisa direset."); return; }
    if (confirm("Reset progres membaca materi?")) {
      dibaca = new Set();
      simpan(KEY_BACA, []);
      perbaruiProgres();
      alert("Progres membaca sudah direset.");
    }
  });

  /* ---------- 13. Mulai ---------- */
  perbaruiProgres();
  showPage("beranda");
})();
