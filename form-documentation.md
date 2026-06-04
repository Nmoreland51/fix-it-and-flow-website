# Fix-it & Flow Customer Interaction Form Documentation

## Form Purpose

The Fix-it & Flow form helps customers request a free quote for phone repair help, data entry, spreadsheet cleanup, or simple business templates. The form collects the information needed to understand the customer's request, contact them back, and provide a clear quote before any work begins.

## Information Collected and Why

| Field | Required? | Why This Information Is Collected |
| --- | --- | --- |
| Full Name | Yes | Identifies the customer so Fix-it & Flow can respond personally and keep each request organized. |
| Email Address | Yes | Provides a reliable way to send the quote, ask follow-up questions, and share next steps. |
| Phone Number | Yes | Allows Fix-it & Flow to call or text if the customer prefers a faster response or if more details are needed. |
| Service Type | Yes | Helps sort the request into the correct category: phone repair, data entry, spreadsheet cleanup, business template, or not sure yet. |
| Preferred Date | No | Helps understand when the customer would like the service, but it is optional because some customers may only want a quote first. |
| Preferred Time Slot | No | Helps schedule follow-up around the customer's availability if they are ready to book. |
| Best Way to Contact You | No, default selected | Lets the customer choose whether they prefer email, phone, or text communication. |
| Project Details or Phone Issue | Yes | Gives Fix-it & Flow the details needed to estimate the work, understand the problem, and prepare an accurate quote. |

## Validation and Error Messages

The form uses validation to make sure customers submit useful contact information and project details.

- Required fields cannot be left blank.
- The email field must use a valid email format, such as `name@example.com`.
- The phone field must include at least 10 digits.
- Each validation error appears near the field that needs attention.
- Error messages are written in clear customer-friendly language, such as asking the customer to provide their email so a quote can be sent.

## Response Process

1. The customer fills out the form and clicks **Request Quote**.
2. The form checks required fields, email format, and phone number format.
3. If information is missing or invalid, the customer sees a clear error message beside the field.
4. If the form is valid, the request is submitted to Fix-it & Flow by email.
5. The customer sees a success message confirming the quote request was submitted.
6. The success message summarizes the submitted details and explains that Fix-it & Flow will follow up soon.
7. The form resets after successful submission so the customer can submit another request if needed.

## Timeline Commitment

Fix-it & Flow will review each quote request and respond within **1 business day** whenever possible. If the request involves a phone part, repair difficulty, or a larger spreadsheet/data project, Fix-it & Flow may ask follow-up questions before giving the final quote.

Customers will receive a clear quote before any work begins, so they can decide whether they want to move forward.

## Website Integration

The form is embedded directly into the Fix-it & Flow website on the Contact page at:

`contact.html#quote-request`

Customers can reach the form through the website navigation and quote buttons, including **Get a Free Quote**, **Request a Free Quote**, and **Request Quote** links. The form uses the same dark background, blue and mint accent colors, rounded corners, bold text, and responsive mobile layout as the rest of the website.
