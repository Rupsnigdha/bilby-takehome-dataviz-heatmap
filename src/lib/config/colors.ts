interface Color {
	name: string;
	code: string;
}

export const colors: Color[] = [
	{
		name: 'red',
		code: '#800020'
	},
	{
		name: 'orange',
		code: '#FFA500'
	},
	{
		name: 'yellow',
		code: '#FFFF00'
	}
	// add more codes here; use in Heatmap.svelte
];
