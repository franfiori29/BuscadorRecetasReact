import React from 'react';
import { Dimmer, Loader as LoaderUI } from 'semantic-ui-react';

export default function Loader() {
	return (
		<Dimmer active inverted >
			<LoaderUI inverted size="massive" inline='centered' >Loading...</LoaderUI>
		</Dimmer>
	)
}
