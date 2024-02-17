export const getId = (id: string | string[]) => {
	return parseInt(typeof id === 'string' ? id : id[0]);
};
