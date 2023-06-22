import React from "react";

const Country = ({name, region, area}) => {
	return (
		<div>
			<div class="dropdown">
				<div class=" cards border border-0 text-dark shadow fs-5 my-2 py-3 bg-light px-3 d-block ">
					<div className="d-flex justify-content-between">{name}</div>
				</div>
				<ul class="w-100" >
					<a class="cardss dropdown-item bg-green" href="#">
						Region: {region}
					</a>
					<a class="cardss dropdown-item  bg-red" href="#">
						Area: {area}
					</a>
				</ul>
			</div>
		</div>
	);
};

export default Country;
