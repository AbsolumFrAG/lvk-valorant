import {
  Button,
  CircularProgress,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LineChart from "../components/home/linesChart";
import PlayerCard, { Player } from "../components/home/playerCard";
import styles from "../styles/Home.module.css";
import { BiRefresh } from "react-icons/bi";
import { fetchPlayers, fetchPlayerStatistics } from "../util/databaseServices";

const Home: NextPage = () => {
  const [loadingplayers, setloadingplayers] = useState<boolean>(false);
  const [loadingstatistics, setloadingstatistics] = useState<boolean>(true);
  const [players, setplayers] = useState<Player[]>([]);
  const [playersstatistics, setplayersstatistics] = useState<any>([]);

  const fetchPlayersData = async () => {
    setloadingplayers(true);
    try {
      const players = await fetchPlayers();
      setplayers(players as Player[]);
    } catch (error) {
      alert("Une erreur est survenue lors de la récupération des joueurs");
    }
    setloadingplayers(false);
  };

  const fetchStatisticsData = async (player: Player) => {
    setloadingstatistics(true);
    try {
      const playerStatistics = await fetchPlayerStatistics(player);
      setplayersstatistics((prev: any) => [...prev, playerStatistics]);
    } catch (error) {
      console.error(error);
      alert(
        "Une erreur est survenue lors de la récupération des stats " +
          player.name
      );
    }
    setloadingstatistics(false);
  };

  const updatePlayersData = async () => {
    setloadingplayers(true);
    setloadingstatistics(true);
    setplayers([]);
    setplayersstatistics([]);
    try {
      await fetch("/api/updatedata");
    } catch (err) {
      console.error(err);
      alert(
        "Une erreur est survenue lors de la mise à jour des données " + err
      );
    }
    fetchPlayersData();
  };

  useEffect(() => {
    setloadingstatistics(true);
    try {
      players.forEach((player) => {
        fetchStatisticsData(player);
      });
    } catch (error) {
      console.error(error);
    }
  }, [players]);

  useEffect(() => {
    if (loadingplayers) return;
    fetchPlayersData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>LVK | Valorant Stats</title>
        <meta name="description" content="Valorant tracker for LVK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading mb={"1rem"} color={"red.500"}>
          LVK | Valorant Stats
        </Heading>
        <Flex
          flexDir={"row"}
          w={"100%"}
          overflowX={"auto"}
          justifyContent={"center"}
        >
          {players &&
            !loadingplayers &&
            players.map((player) => (
              <PlayerCard key={player.name} player={player} />
            ))}
          {loadingplayers && (
            <CircularProgress isIndeterminate color="red"></CircularProgress>
          )}
        </Flex>
        <Flex justifyContent={"center"} w={"75%"} mt={"5rem"}>
          {playersstatistics && !loadingstatistics && (
            <LineChart statistics={playersstatistics}></LineChart>
          )}
          {loadingstatistics && (
            <CircularProgress isIndeterminate color="red"></CircularProgress>
          )}
        </Flex>
        <Button
          onClick={() => updatePlayersData()}
          leftIcon={<Icon as={BiRefresh} />}
          colorScheme="green"
          variant="solid"
        >
          Actualiser les données
        </Button>
      </main>
    </div>
  );
};

export default Home;