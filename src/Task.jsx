import React, { useEffect, useState } from "react";
import Country from "./Country";
import { BsFilter } from "react-icons/bs";

const CountryLists = () => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.com/v2/all?fields=name,region,area")
			.then((res) => res.json())
			.then((res) => setCountries(res))
			.catch((error) => console.log(error));
	}, []);

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
						/>
						<span
							className="input-group-text bg-primary text-white"
							id="basic-addon2"
						>
							<BsFilter />
						</span>
					</div>
					<div class="btn-group" role="group" aria-label="...">
						<div
							class="btn-group me-2"
							role="group"
							aria-label="First group"
						>
							<button
								type="button"
								class="btn btn-outline-danger"
							>
								Page 1
							</button>
							<button
								type="button"
								class="btn btn-outline-warning"
							>
								Page 2
							</button>

							<button
								type="button"
								class="btn btn-outline-success"
							>
								Page 3
							</button>
						</div>
					</div>
				</div>
				{countries.map((c) => (
					<Country name={c.name} region={c.region} area={c.area} />
				))}
			</div>
		</div>
	);
};

export default CountryLists;


