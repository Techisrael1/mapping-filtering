import React, { useEffect, useState } from "react";
import Country from "./Country";
import { BsFilter } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const CountryLists = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [filterValue, setFilterValue] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [perPage] = useState(10); // Number of countries to display per page

	useEffect(() => {
		fetch("https://restcountries.com/v2/all?fields=name,region,area")
			.then((res) => res.json())
			.then((res) => {
				setCountries(res);
				setFilteredCountries(res);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleFilter = (event) => {
		const inputValue = event.target.value;
		setFilterValue(inputValue);

		const filtered = countries.filter((country) => {
			const isNameMatch = country.name.toLowerCase().includes(inputValue.toLowerCase());

			const isSmallerThanLithuania = country.area < getCountryArea("Lithuania");

			const isInOceania = country.region.toLowerCase() === "oceania";

			return isNameMatch && isSmallerThanLithuania && isInOceania;
		});

		setFilteredCountries(filtered);
	};

	const getCountryArea = (countryName) => {
		const country = countries.find(
			(c) => c.name.toLowerCase() === countryName.toLowerCase()
		);
		return country ? country.area : 0;
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const pageCount = Math.ceil(filteredCountries.length / perPage);
	const offset = currentPage * perPage;
	const paginatedCountries = filteredCountries.slice(
		offset,
		offset + perPage
	);

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
							aria-describedby="basic-addon2"
							onChange={handleFilter}
							onClick={handleFilter}
						/>
						<span
							className="input-group-text bg-primary text-white"
							id="basic-addon2"
						>
							<BsFilter value={filterValue} />
						</span>
					</div>
					<div class="btn-group" role="group" aria-label="...">
						<div
							class="btn-group me-2"
							role="group"
							aria-label="First group"
						>
							<ReactPaginate
								previousLabel={"Previous"}
								nextLabel={"Next"}
								breakLabel={"..."}
								breakClassName={"page-item"}
								breakLinkClassName={"page-link"}
								pageCount={pageCount}
								marginPagesDisplayed={1}
								pageRangeDisplayed={3}
								onPageChange={handlePageChange}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"}
								pageClassName={"page-item"}
								pageLinkClassName={"page-link"}
								previousClassName={"page-item"}
								previousLinkClassName={"page-link"}
								nextClassName={"page-item"}
								nextLinkClassName={"page-link"}
							/>
						</div>
					</div>
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
