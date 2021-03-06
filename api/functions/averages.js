let axios = require('axios')
let ticker = require('../data/mtnb.json')

async function getdata(ticker) {
	//console.log("request: ", request)
	let response = axios({
		method:"get",
		url:`http://localhost:3100/eod/${ticker}`,
		config:{ headers: {'Content-Type': 'application/json' }}
	})
	return response
}

async function getUniverse() {
	let response = await axios({
		method:"get",
		url:"http://localhost:3100/eod/all?date=2021-01-06",
		config:{ headers: {'Content-Type': 'application/json' }}
	})
	console.log("Count :",response.data.length)
	return response
}

async function putAverage(data) {
	let response = axios({
		method:"post",
		url:`http://localhost:3100/averages`,
		data: data,
		config: { headers: {'Content-Type': 'application/json' }}
	})
	.catch((err)=>{
		console.log(err.config.data)
	})
	return response
}

async function Avg60Day(ticker) {
	days = 60;
	let range=0; let volume=0; let weighted=0;
	if (ticker.data.length < days || ticker.data[0].T == undefined) {
		console.log("null")
		return null
	}
	let symbol = ticker.data[0].T
	console.log("ticker : ", symbol)

	for (let i=ticker.data.length-1; i > ticker.data.length-days; i--) {
		//console.log(i)
		range = range + (ticker.data[i].h - ticker.data[i].l)
		//console.log("range: ", ticker.data[i].d, range, ticker.data[i].h, ticker.data[i].l)
		volume = volume + (ticker.data[i].v)
		weighted = weighted + ticker.data[i].vw
	}
	let avgVol = volume/days
	let avgWeight = weighted/days
	let avgRange = range/days
	putAverage( {"ticker":symbol, "type":days, "range":avgRange.toFixed(2),"volume":avgVol.toFixed(0),"weighted":avgWeight.toFixed(2) } ) 
	.then(res =>{
		return res
	})
}

async function Avg30Day(ticker) {
	days = 30;

	let range=0; let volume=0; let weighted=0;
	if (ticker.data.length < days || ticker.data[0].T == undefined) {
		console.log("null")
		return null
	}
	let symbol = ticker.data[0].T
	console.log("ticker : ", symbol)

	for (let i=ticker.data.length-1; i > ticker.data.length-days; i--) {
		//console.log(i)
		range = range + (ticker.data[i].h - ticker.data[i].l)
		//console.log("range: ", ticker.data[i].d, range, ticker.data[i].h, ticker.data[i].l)
		volume = volume + (ticker.data[i].v)
		weighted = weighted + ticker.data[i].vw
	}
	let avgVol = volume/days
	let avgWeight = weighted/days
	let avgRange = range/days
	putAverage( {"ticker":symbol, "type":days, "range":avgRange.toFixed(2),"volume":avgVol.toFixed(0),"weighted":avgWeight.toFixed(2) } ) 
	.then(res =>{
		return res
	})
}

async function Avg15Day(ticker) {
	let days = 15
	let range=0; let volume=0; let weighted=0;
	if (ticker.data.length < days || ticker.data[0].T == undefined) {
		console.log("null")
		return null
	}
	let symbol = ticker.data[0].T
	console.log("ticker : ", symbol)

	for (let i=ticker.data.length-1; i > ticker.data.length-days; i--) {
		//console.log(i)
		range = range + (ticker.data[i].h - ticker.data[i].l)
		//console.log("range: ", ticker.data[i].d, range, ticker.data[i].h, ticker.data[i].l)
		volume = volume + (ticker.data[i].v)
		weighted = weighted + ticker.data[i].vw
	}
	let avgVol = volume/days
	let avgWeight = weighted/days
	let avgRange = range/days
	putAverage( {"ticker":symbol, "type":days, "range":avgRange.toFixed(2),"volume":avgVol.toFixed(0),"weighted":avgWeight.toFixed(2) } ) 
	.then(res =>{
		return res
	})
}

async function Avg05Day(ticker) {
	let days = 5
	let range=0; let volume=0; let weighted=0;
	if (ticker.data.length < days || ticker.data[0].T == undefined) {
		console.log("null")
		return null
	}
	let symbol = ticker.data[0].T
	console.log("ticker : ", symbol)

	for (let i=ticker.data.length-1; i > ticker.data.length-days; i--) {
		//console.log(i)
		range = range + (ticker.data[i].h - ticker.data[i].l)
		//console.log("range: ", ticker.data[i].d, range, ticker.data[i].h, ticker.data[i].l)
		volume = volume + (ticker.data[i].v)
		weighted = weighted + ticker.data[i].vw
	}
	let avgVol = volume/days
	let avgWeight = weighted/days
	let avgRange = range/days
	putAverage( {"ticker":symbol, "type":days, "range":avgRange.toFixed(2),"volume":avgVol.toFixed(0),"weighted":avgWeight.toFixed(2) } ) 
	.then(res =>{
		return res
	})
}

async function Avg90Day(ticker) {
	let range=0; let volume=0; let weighted=0;
	if (ticker.data.length < 90 || ticker.data[0].T == undefined) {
		console.log("null")
		return null
	}
	let symbol = ticker.data[0].T
	console.log("ticker : ", symbol)

	for (let i=ticker.data.length-1; i > ticker.data.length-90; i--) {
		//console.log(i)
		range = range + (ticker.data[i].h - ticker.data[i].l)
		//console.log("range: ", ticker.data[i].d, range, ticker.data[i].h, ticker.data[i].l)
		volume = volume + (ticker.data[i].v)
		weighted = weighted + ticker.data[i].vw
	}
	let avgVol = volume/90
	let avgWeight = weighted/90
	let avgRange = range/90
	putAverage( {"ticker":symbol, "type":"90", "range":avgRange.toFixed(2),"volume":avgVol.toFixed(0),"weighted":avgWeight.toFixed(2) } ) 
	.then(res =>{
		return res
	})
}

async function process() {
	let result;
	let data;
	let universe = await getUniverse()
	for (let ticker of universe.data) {
		data = await getdata(ticker)
		if (data !== null) {
			result = await Avg90Day(data)
			result = await Avg60Day(data)
			result = await Avg30Day(data)
			result = await Avg15Day(data)
			result = await Avg05Day(data)
		}
	}
	return true
}
process().then(res => console.log(res)).catch((err)=>console.log(err))
