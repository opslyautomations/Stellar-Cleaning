import Frame from "./ui/Frame";
import StampBadge from "./ui/StampBadge";
import { BUSINESS } from "@/lib/business";

/**
 * The GoHighLevel inline embed, verbatim.
 *
 * There is no custom form anywhere on this site — every quote form is this
 * component. `form_embed.js` is loaded once globally in the root layout, never
 * here, so a second placement cannot load it twice.
 *
 * The iframe cannot be styled from outside, so the Frame around it carries the
 * design. Height is reserved explicitly (620px desktop / 680px mobile) so the
 * embed cannot shift the layout while it loads.
 */
export default function GHLForm({
  heading,
  stamp = "FREE ESTIMATE",
  id,
}: {
  heading?: string;
  stamp?: string;
  id?: string;
}) {
  return (
    <div className="ghl" id={id}>
      <span className="ghl__stamp">
        <StampBadge>{stamp}</StampBadge>
      </span>
      <Frame className="ghl__frame">
        {heading ? <h2 className="ghl__heading">{heading}</h2> : null}
        <div className="ghl__slot">
          <iframe
            src={`${BUSINESS.formHost}/widget/form/${BUSINESS.formId}`}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
            id={`inline-${BUSINESS.formId}`}
            data-layout={"{'id':'INLINE'}"}
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Cleaning Request Form"
            data-height="undefined"
            data-layout-iframe-id={`inline-${BUSINESS.formId}`}
            data-form-id={BUSINESS.formId}
            data-cookie-consent="true"
            data-cookie-consent-provider="auto"
            title="Cleaning Request Form"
          />
        </div>
      </Frame>
    </div>
  );
}
