import React from 'react';
import { __ } from "./i18n";

function Howto(props) {
	return (
		<div className="row justify-content-center">
			<div className="col-lg-8">
				<a href="#howto-content" className="mt-3 btn btn-info btn-sm" data-toggle="collapse" aria-controls="howto-content">
					🛈 {__("How to use the scanner and interpret the results")}
				</a>

				<div className="card my-3 collapse" id="howto-content">
					<div className="card-body">
						<h2>{__("Start a scan")}</h2>
						<p>
							{__("Scan a page of your website by entering its URL and choosing \"Mobiles\" or \"Desktops\".") + ' '}
							{__("As some websites are not equally optimised for both mobiles and desktops, run the scan for each of them and compare the results.") + ' '}
						</p>
						<h2>{__("What is the score about?")}</h2>
						<p>
							{__("You will get a score between 0 and 100, where 100 is the best score reachable.") + ' '}
							{__("The score is based mainly on the amount of bytes transferred over the network to view your page.") + ' '}
							{__("A score of 100 means your page is about as lightweight as an average web page ten years ago.") + ' '}
						</p>
						<h2>{__("And what about the listed details?")}</h2>
						<p>
							{__("You will get a list of diagnostics and opportunities.") + ' '}
							{__("A grey or green circle icon means that there is nothing to do, but some information available.") + ' '}
							{__("A red triangle icon means that there is some optimisation possible.") + ' '}
							{__("Click on an item to show more detailed information.") + ' '}
						</p>
						<h2>{__("What to do next?")}</h2>
						<p>
							{__("Our guides will help you with optimising your website:") + ' '}
							<a href="https://greenerwp.net/get-started/" target="_blank">Get Started</a> {" | "}
							<a href="https://greenerwp.net/guides/" target="_blank">Guides</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Howto;