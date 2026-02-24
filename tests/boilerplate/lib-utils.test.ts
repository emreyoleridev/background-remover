import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildShareUrl, getShareData, openShare } from "@/lib/boilerplate/share";
import { setLocalStorage, getLocalStorage } from "@/lib/boilerplate/storage";
import { subscribeSchema } from "@/lib/boilerplate/validators";

// ---------------------------------------------------------------------------
// share.ts
// ---------------------------------------------------------------------------
describe("buildShareUrl()", () => {
    it("replaces {url} placeholder with encoded URL", () => {
        const result = buildShareUrl("https://share.example.com?u={url}", {
            url: "https://mysite.com",
            text: "Check this out",
            title: "My Tool",
        });
        expect(result).toBe("https://share.example.com?u=" + encodeURIComponent("https://mysite.com"));
    });

    it("replaces {text} placeholder with encoded text", () => {
        const result = buildShareUrl("https://twitter.com/intent/tweet?text={text}&url={url}", {
            url: "https://mysite.com",
            text: "Hello world",
            title: "My Tool",
        });
        expect(result).toContain(encodeURIComponent("Hello world"));
    });

    it("replaces {title} placeholder with encoded title", () => {
        const result = buildShareUrl("https://reddit.com/submit?title={title}&url={url}", {
            url: "https://mysite.com",
            text: "text",
            title: "Amazing Tool",
        });
        expect(result).toContain(encodeURIComponent("Amazing Tool"));
    });

    it("replaces multiple {url} occurrences", () => {
        const result = buildShareUrl("{url}?redirect={url}", {
            url: "https://mysite.com",
            text: "",
            title: "",
        });
        const encoded = encodeURIComponent("https://mysite.com");
        expect(result).toBe(`${encoded}?redirect=${encoded}`);
    });
});

describe("openShare()", () => {
    const mockOpen = vi.fn();

    beforeEach(() => {
        vi.stubGlobal("open", mockOpen);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("calls window.open with correct args", () => {
        openShare("https://facebook.com/share?url=test");
        expect(mockOpen).toHaveBeenCalledWith(
            "https://facebook.com/share?url=test",
            "_blank",
            "noopener,noreferrer"
        );
    });
});

describe("getShareData()", () => {
    beforeEach(() => {
        vi.stubGlobal("location", { href: "http://localhost:3000/my-tool" });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns url = current window.location.href", () => {
        const data = getShareData();
        expect(data.url).toBe("http://localhost:3000/my-tool");
    });

    it("returns non-empty text and title strings", () => {
        const data = getShareData();
        expect(typeof data.text).toBe("string");
        expect(data.text.length).toBeGreaterThan(0);
        expect(typeof data.title).toBe("string");
        expect(data.title.length).toBeGreaterThan(0);
    });
});

// ---------------------------------------------------------------------------
// storage.ts
// ---------------------------------------------------------------------------
describe("setLocalStorage() / getLocalStorage()", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("stores and retrieves a string value", () => {
        setLocalStorage("test_key", "hello");
        expect(getLocalStorage("test_key")).toBe("hello");
    });

    it("returns null for a key that was never set", () => {
        expect(getLocalStorage("nonexistent_key")).toBeNull();
    });

    it("overwrites previously stored value", () => {
        setLocalStorage("test_key", "first");
        setLocalStorage("test_key", "second");
        expect(getLocalStorage("test_key")).toBe("second");
    });
});

// ---------------------------------------------------------------------------
// validators.ts
// ---------------------------------------------------------------------------
describe("subscribeSchema (Zod email validator)", () => {
    it("accepts a valid email address", () => {
        const result = subscribeSchema.safeParse({ email: "user@example.com" });
        expect(result.success).toBe(true);
    });

    it("rejects an email without @ symbol", () => {
        const result = subscribeSchema.safeParse({ email: "notanemail" });
        expect(result.success).toBe(false);
    });

    it("rejects an email without domain", () => {
        const result = subscribeSchema.safeParse({ email: "user@" });
        expect(result.success).toBe(false);
    });

    it("rejects an empty string", () => {
        const result = subscribeSchema.safeParse({ email: "" });
        expect(result.success).toBe(false);
    });

    it("provides the correct error message for invalid email", () => {
        const result = subscribeSchema.safeParse({ email: "bad-email" });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Please enter a valid email address.");
        }
    });
});
