import { forwardRef, useImperativeHandle, useState } from "react";
import {Text} from "react-native";
import ThemedLoader from "./ThemedLoader";

interface PublicLandCardProps {
  name?: string;
  category?: string;
  agency?: string;
  departement?: string;
}

export interface PublicLandCardRef {
    setPublicLandInfo: (props: PublicLandCardProps) => void
}

const PublicLandCard = forwardRef<PublicLandCardRef, PublicLandCardProps>(
    (props, ref) => {
        const [publicLandInfo, setPublicLandInfo] = useState(props);

        useImperativeHandle(ref, () => {
            return {
              setPublicLandInfo
            }
        }, []);

        if (!publicLandInfo.name) {
            return <ThemedLoader/>;
        }

        return (
            <Text>I'm here bitches</Text>
        );
    }
);

export default PublicLandCard;
