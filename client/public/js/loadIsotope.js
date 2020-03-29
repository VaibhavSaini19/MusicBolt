// const loadIsotope = () => {
// 	setTimeout(() => {
// 		let $btns = $(".tracks-area .button-group button");
// 		$btns.click(e => {
// 			$(".tracks-area .button-group button").removeClass("active");
// 			e.target.classList.add("active");

// 			let selector = $(e.target).attr("data-filter");
// 			$(".tracks-area .grid").isotope({
// 				filter: selector
// 			});

// 			return false;
// 		});

// 		$(".tracks-area .button-group #btn1").trigger("click");
// 		console.log("Isotope filter loaded");
// 	}, 1000);
// };
// $(document).ready(loadIsotope());
console.log("asdasd")
window.addEventListener("click", function() {
	console.log('asd')
	loadIsotope();
});
