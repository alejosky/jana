import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
	{
		ignores: ["legacy/**", "out/**", "screenshots/**", "public/assets/**"],
	},
	...nextVitals,
];

export default config;