import {
  InfoIcon,
} from "@/components/atoms/icons";

export const SIDEBAR_MENU = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: "/assets/images/house-r.png",
    },
    {
      title: "Data Siswa",
      url: "data siswa",
      icon: "/assets/images/books.png",
    },
    {
      title: "Data Guru",
      url: "data guru",
      icon: "/assets/images/immigration.png",
    },
    {
      title: "Absensi",
      url: "absensi",
      icon: "/assets/images/homework.png",
    },
    {
      title: "Kelas & Tahun Ajaran",
      url: "kelola kelas",
      icon: "/assets/images/task.png",
    },
  ],
  info: [
    {
      title: process.env.BUILD_ID ?? "unknown version",
      icon: InfoIcon,
    },
  ],
};

export const SIDEBAR_MENU_GURU = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: "/assets/images/house-r.png",
    },
    {
      title: "Absensi Manual",
      url: "absen manual",
      icon: "/assets/images/homework.png",
    },
    {
      title: "Input Keterangan",
      url: "input keterangan",
      icon: "/assets/images/task.png",
    },
    {
      title: "Riwayat Absensi",
      url: "riwayat absensi",
      icon: "/assets/images/file.png",
    },
    {
      title: "Rekap Kelas",
      url: "rekap kelas",
      icon: "/assets/images/note.png",
    },
  ],
  info: [
    {
      title: process.env.BUILD_ID ?? "unknown version",
      icon: InfoIcon,
    },
  ],
};


export const SIDEBAR_MENU_ORTU = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: "/assets/images/house-r.png",
    },
    {
      title: "Riwayat",
      url: "riwayat absensi",
      icon: "/assets/images/homework.png",
    },
  ],
  info: [
    {
      title: process.env.BUILD_ID ?? "unknown version",
      icon: InfoIcon,
    },
  ],
};

