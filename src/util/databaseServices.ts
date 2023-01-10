import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { Player } from "../components/home/playerCard";
import { db } from "./firebase";

const fetchPlayers = async () => {
  try {
    const q = query(collection(db, "players"));
    const doc = await getDocs(q);
    const data = doc.docs.map((d) => d.data());
    return data as Player[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const fetchPlayerStatistics = async (player: Player) => {
  let randomColor = "fffff";
  while (randomColor.length === 5) {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
  }

  let playerStatistics: any = {
    label: player.name,
    data: [],
    backgroundColor: `#${randomColor}`,
    borderColor: `#${randomColor}`,
  };

  const q = query(
    collection(db, `eloprogress/${player.docref}/data`),
    orderBy("timestamp", "asc")
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const x = doc
      .data()
      .timestamp.toDate()
      .toLocaleDateString("fr-FR")
      .slice(0, 5);
    const y = doc.data().MMR;
    const eloname = doc.data().eloname;
    const pdl = doc.data().pdl;
    playerStatistics.data.push({ x: x, y: y, eloname: eloname, pdl: pdl });
  });

  return playerStatistics;
};

export { fetchPlayers, fetchPlayerStatistics };
