import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import ConfettiGenerator from "confetti-js";
import messages from "../utils/birthdayWishes.js";
import useTheme from "../hooks/useTheme";
import * as htmlToImage from "html-to-image";
import FileSaver from "file-saver";
import { Button } from "../components";

const Wish = ({ history }) => {
	const router = useRouter();
	const { name } = router.query; // gets both name & color id in form of array [name,colorId]
	const color = name ? name[1] : 0; //extracting colorId from name
	const [downloading, setDownloading] = useState(false);
	const [downloadedOnce, setDownloadedOnce] = useState(false);
	const audioRef = useRef();

	const { setTheme } = useTheme();

	useEffect(() => {
		// Theme Change
		setTheme(color);

		if (downloading === false) {
			// Confetti
			const confettiSettings = {
				target: "canvas",
				start_from_edge: true,
			};
			const confetti = new ConfettiGenerator(confettiSettings);
			confetti.render();
			audioRef.current.play();
		}
	}, [color, downloading]);

	useEffect(() => {
		if (downloading === true && downloadedOnce === false) {
			downloadImage();
		}
	}, [downloading, downloadedOnce]);

	// function for randomly picking the message from messages array
	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	const downloadImage = () => {
		if (downloadedOnce === true) return;

		const node = document.getElementById("image");

		if (node) {
			setDownloadedOnce(true);

			htmlToImage.toPng(node).then((blob) => {
				FileSaver.saveAs(blob, "birthday-wish.png");
				setDownloading(false);
			});
		}
	};

	const title = () => {
		const wish = "Happy Birthday Didi!";
		const base_letters = [];
		const name_letters = [];

		for (let i = 0; i < wish.length; i++) {
			if (i < 15) {
				const letter = wish.charAt(i);
				base_letters.push(
					<span key={i} style={{ "--i": i + 1 }}>
						{letter}
					</span>
				);
			} else {
				const letter = wish.charAt(i);
				name_letters.push(
					<span key={i} style={{ "--i": i + 1 }} className={styles.span}>
						{letter}
					</span>
				);
			}
		}

		return (
			<>
				{downloading ? (
					<h1
						className={styles.titleImg}
						style={{ "--wish-length": wish.length }}
					>
						<div>{base_letters.map((letter) => letter)}</div>
						<div>{name_letters.map((letter) => letter)}</div>
					</h1>
				) : (
					<h1 className={styles.title} style={{ "--wish-length": wish.length }}>
						<div>{base_letters.map((letter) => letter)}</div>
						<div>{name_letters.map((letter) => letter)}</div>
					</h1>
				)}
			</>
		);
	};

	if (downloading) {
		return (
			<div className={styles.containerImg} id="image" onClick={downloadImage}>
				{downloadImage()}
				<main className={styles.image}>
					<div>
						<div className={styles.main}>{title()}</div>

						<div style={{ height: 40 }} />

						<p className={styles.descImg}>
							{messages[randomNumber(0, messages.length)].value}
						</p>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Happy Birthday Didi</title>
				<meta
					name="description"
					content={`A special surprise birthday wish!`}
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet" />
			</Head>

			<canvas className={styles.canvas} id="canvas"></canvas>

			{/* Flying Balloons */}
			<div className={styles.balloonsContainer}>
				<div className={styles.balloon} style={{"--delay": "0s"}}>🎈</div>
				<div className={styles.balloon} style={{"--delay": "1s"}}>🎈</div>
				<div className={styles.balloon} style={{"--delay": "2s"}}>🎈</div>
				<div className={styles.balloon} style={{"--delay": "0.5s"}}>🎈</div>
				<div className={styles.balloon} style={{"--delay": "1.5s"}}>🎈</div>
				<div className={styles.balloon} style={{"--delay": "2.5s"}}>🎈</div>
			</div>

			<main className={styles.animate}>
				<div>
					{/* Photo Section */}
					<div className={styles.photoContainer}>
						<div className={styles.photoFrame}>
							<img 
								src="/photo-placeholder.jpg" 
								alt="Birthday Person" 
								className={styles.photo}
								onError={(e) => {
									e.target.style.display = 'none';
									e.target.parentElement.innerHTML = '<div class="' + styles.photoPlaceholder + '">📷<br/>Photo Coming Soon</div>';
								}}
							/>
						</div>
					</div>

					<div className={styles.main}>{title()}</div>
					
					<div className={styles.messageContainer}>
						<p className={styles.desc}>
							🌟 To the one who’s always been my strength and my biggest support, 🌟
						</p>
						<p className={styles.desc}>
								thank you for everything you do for me, even the things I never say out loud.
						</p>
						<p className={styles.desc}>
						May your life always be filled with happiness, peace, and beautiful moments.
						I’m so lucky to have you as my sister. 💕
						</p>
						<p className={styles.descHighlight}>
							✨ Happy Birthday, Didi! ✨
						</p>
					</div>
				</div>

				<div className={styles.buttonContainer}>
					<Button
						onClick={() => router.push("/")}
						text="&larr; Back"
					/>
				</div>
			</main>
			<audio ref={audioRef} id="player" autoPlay>
				<source src="media/hbd.mp3" />
			</audio>
		</div>
	);
};

export default Wish;
