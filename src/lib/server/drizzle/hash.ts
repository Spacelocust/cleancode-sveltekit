const hash = await Bun.password.hash(Bun.argv[2]);
console.log(hash);
export {}