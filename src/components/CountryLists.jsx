import React, { useEffect, useState } from "react";
import Country from "./Country";
import { BsFilter } from "react-icons/bs";

const CountryLists = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [filteredValue, setFilteredValue] = useState("");
	const [presentPage, setPresentPage] = useState(1);
	const [eachPage] = useState(25);

	useEffect(() => {
		fetch("https://restcountries.com/v2/all?fields=name,region,area")
			.then((res) => res.json())
			.then((res) => {
				setCountries(res);
				setFilteredCountries(res);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleFilter = () => {
		const filtered = countries.filter((country) => {
			const matchName = country.name
				.toLowerCase()
				.includes(filteredValue.toLowerCase());

			const smallerToLuthiana = country.area < getArea("Lithuania");

			const inOceania = country.region.toLowerCase() === "oceania";

			return matchName && smallerToLuthiana && inOceania;
		});

		setFilteredCountries(filtered);
	};

	const getArea = (countryName) => {
		const country = countries.find(
			(c) => c.name.toLowerCase() === countryName.toLowerCase()
		);
		return country ? country.area : 0;
	};

	const lastIndex = presentPage * eachPage;
	const firstIndex = lastIndex - eachPage;
	const paginatedCountries = filteredCountries.slice(firstIndex, lastIndex);
	const pageCount = Math.ceil(filteredCountries.length / eachPage);
	const numbers = [...Array(pageCount + 1).keys()].slice(1);

	const prePage = () => {
		if (presentPage !== firstIndex) setPresentPage(presentPage - 1);
	};
	const changePage = (c) => {
		setPresentPage(c);
	};
	const nextPage = () => {
		if (presentPage !== lastIndex) setPresentPage(presentPage + 1);
	};
	const active = (pageNumber, currentPage) => {
		return pageNumber === currentPage ? "active" : "";
	};

	return (
		<div className="container-fluid-sm container p-5">
			<div className="card w-100 p-5">
				<div className="">
					<div className="input-group mb-3 w-25">
						<input
							type="text"
							className="form-control"
							placeholder="Enter Country"
							aria-label="Enter Country"
							aria-describedby="bac-addon2"
							value={filteredValue}
							onChange={(event) =>
								setFilteredValue(event.target.value)
							}
						/>
						<button
							className="input-group-text bg-primary text-white"
							id="bac-addon2"
							onClick={handleFilter}
						>
							<BsFilter />
						</button>
					</div>
					<div className="btn-group" role="group" aria-label="...">
						<div
							className="btn-group me-2"
							role="group"
							aria-label="First group"
						></div>
					</div>
					<nav>
						<ul className="d-flex Pagination">
							<div className="page-item">
								<a
									href="#"
									className="page-link"
									onClick={prePage}
								>
									Prev
								</a>
							</div>
							{numbers.map((c, i) => (
								<li
									className={`page-item ${active(
										c,
										presentPage
									)}`}
									key={i}
								>
									<a
										href="#"
										className="page-link"
										onClick={() => changePage(c)}
									>
										{c}
									</a>
								</li>
							))}
							<li className="page-item">
								<a
									href="#"
									className="page-link"
									onClick={nextPage}
								>
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
				{paginatedCountries.map((c) => (
					<Country
						key={c.name}
						name={c.name}
						region={c.region}
						area={c.area}
					/>
				))}
			</div>
		</div>
	);
};

export default CountryLists;
