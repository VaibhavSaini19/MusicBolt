const loadIsotope = () => {
	setTimeout(() => {
		let $btns = $(".products-area .button-group button");
		$btns.click(e => {
			$(".products-area .button-group button").removeClass("active");
			e.target.classList.add("active");

			let selector = $(e.target).attr("data-filter");
			$(".products-area .grid").isotope({
				filter: selector
			});

			return false;
		});

		$(".products-area .button-group #btn1").trigger("click");
		console.log("Isotope filter loaded");
	}, 1000);
};
$(document).ready(loadIsotope());

// window.addEventListener("click", function() {
// 	loadIsotope();
// });
