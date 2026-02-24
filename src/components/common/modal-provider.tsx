"use client";

import { SubscribeModal } from "@/components/common/subscribe-modal";
import { ShareModal } from "@/components/common/share-modal";

export function ModalProvider() {
    return (
        <>
            <SubscribeModal />
            <ShareModal />
        </>
    );
}
