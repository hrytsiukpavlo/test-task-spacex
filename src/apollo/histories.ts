import { gql } from "@apollo/client";

export const ALL_HISTORIES = gql`
	{
		histories {
			id
			title
			flight {
				links {
					flickr_images
				}
				mission_name
			}
		}
	}
`;
