function createSongList(arr) {
  class Song {
    constructor(typeList, name, time) {
      this.typeList = typeList;
      this.name = name;
      this.time = time;
    }
  }

  const songs = [];
  for (let index = 1; index < arr.length - 1; index++) {
    const crrSong = arr[index];
    const [typeList, name, time] = crrSong.split("_");
    const song = new Song(typeList, name, time);
    songs.push(song);
  }

  const printType = arr[arr.length - 1];
  if (printType === "all") {
    songs.forEach((s) => console.log(s.name));
  } else {
    songs.forEach((element) => {
      if (element.typeList === printType) {
        console.log(element.name);
      }
    });
  }
}

createSongList([
  4,
  "favourite_DownTown_3:14",
  "listenLater_Andalouse_3:24",
  "favourite_In To The Night_3:58",
  "favourite_Live It Up_3:48",
  "listenLater",
]);
