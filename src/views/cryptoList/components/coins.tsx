"use client";
import { FC, useEffect, useState, useMemo } from "react";
// import Header from "./header";
// import Footer from "./footer";
// import { Sparklines, SparklinesLine } from 'react-sparklines';
interface IPriceComponent {
    API_KEY: string | undefined;
}

type FetchOptions = {
    method: string;
    headers: any;
};

const PriceComponent: FC<IPriceComponent> = ({ API_KEY }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalMarketCap, setTotalMarketCap] = useState("");
    const [totalVolume, setTotalVolume] = useState("");
    const [topGainer, setTopGainer] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetchData();
    }, [API_KEY]);

    const fetchData = () => {
        if (!API_KEY) return;
        const options: FetchOptions = {
            method: "GET",
            headers: { accept: "application/json", "x-cg-pro-api-key": API_KEY },
        };

        Promise.all([
            fetch(
                "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&price_change_percentage=1h%2C24h%2C7d&precision=2&sparkline=true",
                options
            ).then((response) => response.json()),
            fetch("https://pro-api.coingecko.com/api/v3/global", options).then(
                (response) => response.json()
            ),
            fetch(
                "https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd&duration=24h",
                options
            ).then((response) => response.json()),
            fetch("https://pro-api.coingecko.com/api/v3/search/trending", options).then(
                (response) => response.json()
            ),
        ])
            .then(([marketData, globalData, gainersData, trendingData]) => {
                setData(marketData);
                setTotalMarketCap(formatNumberWithCommas(globalData.data.total_market_cap.usd.toFixed()));
                setTotalVolume(formatNumberWithCommas(globalData.data.total_volume.usd.toFixed()));
                setTopGainer(gainersData.top_gainers);
                setTrending(trendingData.coins);
            })
            .catch((err) => console.error(err));
    };

    const formatNumberWithCommas = (number: any) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat().format(num);
    };

    const formatPercentage = (num: number | null) => {
        return num !== null && num !== undefined ? num.toFixed(2).replace("-", '') : "0.00";
    };

    const formatLargeNumber = (num: number) => {
        if (num >= 1e12) {
            return `$${(num / 1e12).toFixed(2)}T`;
        } else if (num >= 1e9) {
            return `$${(num / 1e9).toFixed(2)}B`;
        } else if (num >= 1e6) {
            return `$${(num / 1e6).toFixed(2)}M`;
        }
        return `$${formatNumber(num)}`;
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = useMemo(() => data.slice(indexOfFirstItem, indexOfLastItem), [
        data,
        indexOfFirstItem,
        indexOfLastItem,
    ]);
    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`border rounded px-3 py-1 mx-1 ${currentPage === i ? "bg-gray-200" : ""}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`border rounded px-3 py-1 mx-1 ${currentPage === 1 ? "bg-gray-200" : ""}`}
                >
                    1
                </button>
            );
            if (currentPage > 3) {
                pages.push(<span key="dots1" className="px-3">...</span>);
            }

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`border rounded px-3 py-1 mx-1 ${currentPage === i ? "bg-gray-200" : ""}`}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) {
                pages.push(<span key="dots2" className="px-3">...</span>);
            }

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`border rounded px-3 py-1 mx-1 ${currentPage === totalPages ? "bg-gray-200" : ""}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };
    const getSparklineColor = (prices: number[]) => {
        if (prices[0] < prices[prices.length - 1]) {
            return "green";
        } else {
            return "red";
        }
    };

    return (
        <>
            {/* <Header API_KEY={API_KEY} /> */}
            <main className="bg-white py-6 px-2">
                <div className="max-w-7xl m-auto grid sm-laptop:grid-cols-3 gap-3 rounded-lg mb-5">
                    <div className="flex flex-col gap-2">
                        <MarketCapWidget market_cap={totalMarketCap} volume={totalVolume} />
                    </div>
                    <div className="shadow-default py-1.5 px-2 rounded-lg">
                        <PriceWidget title={"🔥Trending"} data={trending} path={"/trending-crypto"} />
                    </div>
                    <div className="shadow-default py-1.5 px-2 rounded-lg">
                        <PriceWidget title={"🚀Largest Gainers"} data={topGainer} path={"/crypto-gainers-losers"} />
                    </div>
                </div>
                <div className="max-w-7xl m-auto lg:shadow-default p-4 rounded-lg">
                    <div className="border-border-default overflow-x-auto lg:overflow-visible">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="text-xs border-b-2">
                                <tr>
                                    <th scope="col" className="py-3 sticky left-0 bg-white z-50">#</th>
                                    <th scope="col" className="px-6 py-3 sticky left-4 bg-white z-50">Name</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">1h %</th>
                                    <th scope="col" className="px-6 py-3">24h %</th>
                                    <th scope="col" className="px-6 py-3">7d %</th>
                                    <th scope="col" className="px-6 py-3">Market Cap</th>
                                    <th scope="col" className="px-6 py-3">24h Volume</th>
                                    <th scope="col" className="px-6 py-3">Last 7 Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((d: any, index) => (
                                    <tr key={indexOfFirstItem + index} className="border-b-2">
                                        <td className="py-3 font-medium whitespace-nowrap sticky left-0 bg-white z-50">{indexOfFirstItem + index + 1}</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap sticky left-4 bg-white z-50">
                                            <div className="flex items-center">
                                                <img className="w-5 h-5 mr-2 rounded-full" src={d.image} alt={d.name} />
                                                {d.name} ({d.symbol.toUpperCase()})
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <span>${formatNumber(d.current_price)}</span>
                                        </td>
                                        <td className={`${d.price_change_percentage_1h_in_currency >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="flex items-center justify-end">
                                                {d.price_change_percentage_1h_in_currency >= 0 ? (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M5.30133 2.40909C5.61185 1.86364 6.38815 1.86364 6.69867 2.40909L10.8907 9.77273C11.2012 10.3182 10.8131 11 10.192 11H1.80796C1.18692 11 0.798767 10.3182 1.10929 9.77273L5.30133 2.40909Z" fill="currentColor"></path></svg>
                                                ) : (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M6.69867 9.59091C6.38815 10.1364 5.61185 10.1364 5.30133 9.59091L1.10929 2.22727C0.798767 1.68182 1.18692 1 1.80796 1H10.192C10.8131 1 11.2012 1.68182 10.8907 2.22727L6.69867 9.59091Z" fill="currentColor"></path></svg>
                                                )}
                                                {formatPercentage(d.price_change_percentage_1h_in_currency)}%
                                            </span>
                                        </td>
                                        <td className={`${d.price_change_percentage_24h_in_currency >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="flex items-center justify-end ">
                                                {d.price_change_percentage_24h_in_currency >= 0 ? (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M5.30133 2.40909C5.61185 1.86364 6.38815 1.86364 6.69867 2.40909L10.8907 9.77273C11.2012 10.3182 10.8131 11 10.192 11H1.80796C1.18692 11 0.798767 10.3182 1.10929 9.77273L5.30133 2.40909Z" fill="currentColor"></path></svg>
                                                ) : (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M6.69867 9.59091C6.38815 10.1364 5.61185 10.1364 5.30133 9.59091L1.10929 2.22727C0.798767 1.68182 1.18692 1 1.80796 1H10.192C10.8131 1 11.2012 1.68182 10.8907 2.22727L6.69867 9.59091Z" fill="currentColor"></path></svg>
                                                )}
                                                {formatPercentage(d.price_change_percentage_24h_in_currency)}%
                                            </span>
                                        </td>
                                        <td className={`${d.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="flex items-center justify-end">
                                                {d.price_change_percentage_7d_in_currency >= 0 ? (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M5.30133 2.40909C5.61185 1.86364 6.38815 1.86364 6.69867 2.40909L10.8907 9.77273C11.2012 10.3182 10.8131 11 10.192 11H1.80796C1.18692 11 0.798767 10.3182 1.10929 9.77273L5.30133 2.40909Z" fill="currentColor"></path></svg>
                                                ) : (
                                                    <svg viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 me-1"><path d="M6.69867 9.59091C6.38815 10.1364 5.61185 10.1364 5.30133 9.59091L1.10929 2.22727C0.798767 1.68182 1.18692 1 1.80796 1H10.192C10.8131 1 11.2012 1.68182 10.8907 2.22727L6.69867 9.59091Z" fill="currentColor"></path></svg>
                                                )}
                                                {formatPercentage(d.price_change_percentage_7d_in_currency)}%
                                            </span>
                                        </td>
                                        <td>
                                            <span>{formatLargeNumber(d.market_cap)}</span>
                                        </td>
                                        <td>
                                            <span>{formatLargeNumber(d.total_volume)}</span>
                                        </td>
                                        <td className="w-[230px] h-[60px]">
                                            {/* <Sparklines data={d.sparkline_in_7d.price}  >
                                                <SparklinesLine color={getSparklineColor(d.sparkline_in_7d.price)} />
                                            </Sparklines> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <label htmlFor="itemsPerPage" className="mr-2">Show</label>
                            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="border rounded p-1">
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <div>
                            Page {currentPage} of {totalPages}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border rounded px-3 py-1 mx-1"
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6 rtl:rotate-180"><path fillRule="evenodd" clipRule="evenodd" d="M14.3723 4.64576C14.5671 4.45141 14.883 4.45141 15.0778 4.64576L15.8539 5.41993C16.0487 5.61427 16.0487 5.92937 15.8539 6.12372L9.96317 12L15.8539 17.8763C16.0487 18.0706 16.0487 18.3857 15.8539 18.5801L15.0778 19.3542C14.883 19.5486 14.5671 19.5486 14.3723 19.3542L7 12L14.3723 4.64576Z" fill="currentColor"></path></svg>
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border rounded px-3 py-1 mx-1"
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6 rotate-180"><path fillRule="evenodd" clipRule="evenodd" d="M14.3723 4.64576C14.5671 4.45141 14.883 4.45141 15.0778 4.64576L15.8539 5.41993C16.0487 5.61427 16.0487 5.92937 15.8539 6.12372L9.96317 12L15.8539 17.8763C16.0487 18.0706 16.0487 18.3857 15.8539 18.5801L15.0778 19.3542C14.883 19.5486 14.5671 19.5486 14.3723 19.3542L7 12L14.3723 4.64576Z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default PriceComponent;



const MarketCapWidget = ({ market_cap, volume }: { market_cap: string, volume: string }) => {
    return (
        <>
            <div className="shadow-default overflow-hidden flex items-center justify-between gap-3 rounded-xl bg-white p-4 h-full ring-gray-200 dark:bg-moon-900 dark:ring-moon-700">
                <div className="flex flex-col">
                    <p className="font-bold text-gray-900 dark:text-moon-50 text-lg leading-7">
                        ${market_cap}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center text-gray-500 dark:text-moon-200 font-semibold text-sm leading-5">
                        Market Cap
                    </p>
                </div>
                <div>
                    <img
                        src="https://www.coingecko.com/total_market_cap.svg"
                        className="h-full"
                    />
                </div>
            </div>
            <div className="shadow-default overflow-hidden flex items-center justify-between gap-3 rounded-xl bg-white p-4 h-full dark:bg-moon-900 dark:ring-moon-700">
                <div className="flex flex-col">
                    <p className="font-bold text-gray-900 dark:text-moon-50 text-lg leading-7">
                        ${volume}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center text-gray-500 dark:text-moon-200 font-semibold text-sm leading-5">
                        24h Trading Volume
                    </p>
                </div>
                <div>
                    <img
                        src="https://www.coingecko.com/total_volume.svg"
                        className="h-full"
                    />
                </div>
            </div>
        </>
    )
}



const PriceWidget = ({ title, data, path }: { title: string; data?: any[]; path: string }) => {
    const formatNumber = (value: number) => {
        if (value < 1e-4) {
            let parts = value.toExponential().split("e");
            console.log("parts + ", parts);
            let base = parseFloat(parts[0]).toFixed(1).replace(".", "");
            console.log("base + ", base);
            let exponent = parseInt(parts[1], 10);
            let numZeros = Math.abs(exponent) - 1;
            let formattedValue = `0.0<sub>${numZeros}</sub>${base}`;
            return <span dangerouslySetInnerHTML={{ __html: formattedValue }} />;
        } else {
            return `${value?.toFixed(4)}`;
        }
    };

    const formatPercentage = (value: number) => {
        return parseFloat(value?.toFixed(1));
    };

    return (
        <>
            <div className="flex justify-between pt-2.5 mb-2.5 px-2 truncate">
                <div
                    data-view-component="true"
                    className="text-gray-900 dark:text-moon-50 font-semibold text-base leading-6"
                >
                    {title}
                </div>
                <div>
                    <a href={path} className="flex items-center text-sm font-semibold">
                        View more
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 md:w-4 md:h-4 rotate-180"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.3723 4.64576C14.5671 4.45141 14.883 4.45141 15.0778 4.64576L15.8539 5.41993C16.0487 5.61427 16.0487 5.92937 15.8539 6.12372L9.96317 12L15.8539 17.8763C16.0487 18.0706 16.0487 18.3857 15.8539 18.5801L15.0778 19.3542C14.883 19.5486 14.5671 19.5486 14.3723 19.3542L7 12L14.3723 4.64576Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div>
                {" "}
                {data?.slice(0, 3).map((d, index) => (
                    <a href="">
                        <div>
                            <div className="flex justify-between px-2 py-2.5 hover:bg-gray-50 rounded-lg dark:hover:bg-moon-700">
                                <div className="flex items-center gap-x-2 max-w-[50%]">
                                    <img
                                        alt="Turbo"
                                        className="rounded-full"
                                        src={d.image || d.item.small}
                                        width="24"
                                        height="24"
                                    />
                                    <div className="block truncate text-gray-500 dark:text-moon-200">
                                        <span className="text-gray-700 dark:text-moon-100 font-semibold text-sm leading-5">
                                            {d.name || d.item.name}
                                        </span>{" "}
                                    </div>
                                </div>
                                <div className="flex justify-end items-center flex-shrink-0 max-w-[50%] break-words text-right">
                                    <div className="max-w-full inline ">
                                        <span className="text-gray-900 flex dark:text-moon-50 font-medium text-sm leading-5">
                                            <span>${formatNumber(d.usd || d.item.data.price)}</span>
                                            <span
                                                className={`${formatPercentage(
                                                    d.usd_24h_change ||
                                                    d.item.data.price_change_percentage_24h.usd
                                                ) >= 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                                    } ml-3 flex items-center`}
                                            >
                                                {formatPercentage(
                                                    d.usd_24h_change ||
                                                    d.item.data.price_change_percentage_24h.usd
                                                ) >= 0 ? (
                                                    <svg
                                                        viewBox="0 0 12 12"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-3 h-3 me-1"
                                                    >
                                                        <path
                                                            d="M5.30133 2.40909C5.61185 1.86364 6.38815 1.86364 6.69867 2.40909L10.8907 9.77273C11.2012 10.3182 10.8131 11 10.192 11H1.80796C1.18692 11 0.798767 10.3182 1.10929 9.77273L5.30133 2.40909Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        viewBox="0 0 12 12"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-3 h-3 me-1"
                                                    >
                                                        <path
                                                            d="M6.69867 9.59091C6.38815 10.1364 5.61185 10.1364 5.30133 9.59091L1.10929 2.22727C0.798767 1.68182 1.18692 1 1.80796 1H10.192C10.8131 1 11.2012 1.68182 10.8907 2.22727L6.69867 9.59091Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                )}
                                                {formatPercentage(
                                                    d.usd_24h_change ||
                                                    d.item.data.price_change_percentage_24h.usd
                                                )}
                                                %
                                            </span>
                                        </span>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};
