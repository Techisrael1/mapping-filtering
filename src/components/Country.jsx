import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

const Country = ({name, region, area}) => {
	return (
		<div>
			<div class="dropdown">
				<div
					class=" cards border border-0 text-dark shadow fs-5 my-2 py-3 bg-light px-3 d-block "
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<div className="d-flex justify-content-between">
						{name} <BsFillCaretDownFill />
					</div>
				</div>
				<ul
					class="dropdown-menu w-100"
					aria-labelledby="dropdownMenuButton1"
				>
					<li>
						<a class="dropdown-item bg-green" href="#">
							Region: {region}
						</a>
					</li>
					<li>
						<a class="dropdown-item  bg-red" href="#">
							Area: {area}
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Country;
