
const api = {
    getAllCoins: function () {
        return $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list",
            method: "get"
        })
    },
    allCoinData: id => {
        return $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${id}`,
            method: "get"
        });
    },
};
