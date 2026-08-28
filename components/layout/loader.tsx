"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LettersPullUp } from "@/components/ui/letters-pull-up";

const INITIAL_CURVE = 300;
const DURATION = 800;
const HOLD = 700;

interface LoaderProps {
	onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const startRef = useRef<number | null>(null);
	const [isExiting, setIsExiting] = useState(false);

	const animate = (timestamp: number) => {
		if (startRef.current === null) {
			startRef.current = timestamp;
		}
		const elapsed = timestamp - startRef.current;

		setPath(easeOutQuad(elapsed, INITIAL_CURVE, -INITIAL_CURVE, DURATION));

		if (loaderRef.current) {
			const y = easeOutQuad(elapsed, 0, -loaderHeight(), DURATION);
			loaderRef.current.style.transform = `translateY(${y}px)`;
		}

		if (elapsed < DURATION) {
			requestAnimationFrame(animate);
		} else {
			// eslint-disable-next-line react-hooks/immutability
			document.body.style.overflow = "";
			onComplete?.();
		}
	};

	const easeOutQuad = (
		time: number,
		start: number,
		end: number,
		duration: number,
	) => {
		return -end * (time /= duration) * (time - 2) + start;
	};

	const loaderHeight = () => {
		if (!loaderRef.current) return 0;
		return loaderRef.current.getBoundingClientRect().height;
	};

	const setPath = (curve: number) => {
		if (!pathRef.current || typeof window === "undefined") return;
		const width = window.innerWidth;
		const height = loaderHeight() || window.innerHeight;
		pathRef.current.setAttributeNS(
			null,
			"d",
			`M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - curve} 0 ${height} L0 0`,
		);
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		setPath(INITIAL_CURVE);

		const timer = setTimeout(() => {
			setIsExiting(true);
			requestAnimationFrame(animate);
		}, HOLD);

		return () => {
			clearTimeout(timer);
			document.body.style.overflow = "";
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={loaderRef}
			className="fixed inset-0 z-[999] h-screen w-screen bg-foreground text-background will-change-transform"
		>
			<svg className="absolute inset-0 h-full w-full">
				<path ref={pathRef} fill="var(--foreground)" />
			</svg>

			<motion.div
				className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-background"
				initial={{ opacity: 0, scale: 0.85 }}
				animate={{
					opacity: isExiting ? 0 : 1,
					scale: isExiting ? 0.85 : 1,
				}}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				<div className="flex h-20 w-20 items-center justify-center rounded-full border border-background/60 bg-background/5  sm:h-28 sm:w-28">
					<Image
						src="/logo.png"
						alt="Logo"
						width={120}
						height={120}
						priority
						className="h-full w-full rounded-full object-contain"
					/>
				</div>
				<LettersPullUp text="Hallå" className="font-heading text-background" />
			</motion.div>
		</div>
	);
}
