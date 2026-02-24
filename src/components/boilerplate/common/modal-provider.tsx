"use client";

import { SubscribeModal } from "@/components/boilerplate/common/subscribe-modal";
import { ShareModal } from "@/components/boilerplate/common/share-modal";

export function ModalProvider() {
    return (
        <>
            <SubscribeModal />
            <ShareModal />
        </>
    );
}
