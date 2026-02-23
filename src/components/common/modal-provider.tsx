"use client";

import { SubscribeModal } from "@/components/common/subscribe-modal";
import { ShareModal } from "@/components/share/share-modal";

export function ModalProvider() {
    return (
        <>
            <SubscribeModal />
            <ShareModal />
        </>
    );
}
