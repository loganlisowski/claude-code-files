from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

output_path = "/Users/sfino/Desktop/Claude Code/Logan_Lisowski_Email_to_Dr_Myers.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    topMargin=1 * inch,
    bottomMargin=1 * inch,
    leftMargin=1 * inch,
    rightMargin=1 * inch,
)

styles = getSampleStyleSheet()

body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontSize=11,
    leading=16,
    spaceAfter=10,
    fontName="Helvetica",
)

bold_style = ParagraphStyle(
    "BoldBody",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=12,
    spaceAfter=4,
    spaceBefore=14,
)

link_style = ParagraphStyle(
    "LinkBody",
    parent=body_style,
    fontSize=10,
    textColor=HexColor("#1a0dab"),
    spaceAfter=6,
)

greeting_style = ParagraphStyle(
    "Greeting",
    parent=body_style,
    spaceBefore=0,
    spaceAfter=12,
)

closing_style = ParagraphStyle(
    "Closing",
    parent=body_style,
    spaceBefore=16,
    spaceAfter=2,
)

story = []

# Greeting
story.append(Paragraph("Hi Dr. Myers,", greeting_style))

story.append(Paragraph(
    "I hope you're doing well. I wanted to reach out about my three challenge project submissions "
    "for the course. I have all three ready to demo whenever works for you. Below is a summary of "
    "each project, what it does, and the reasoning behind it.",
    body_style,
))

# Project 1
story.append(Paragraph("1. OrlandoCRE Intelligence Platform", bold_style))
story.append(Paragraph(
    'Live: <link href="https://orlando-cre.vercel.app">https://orlando-cre.vercel.app</link><br/>'
    'GitHub: <link href="https://github.com/serdtfryguhhash/orlando-cre">https://github.com/serdtfryguhhash/orlando-cre</link>',
    link_style,
))
story.append(Paragraph(
    "This is a commercial real estate analytics platform focused on the Orlando market. It has five "
    "pages: a property dashboard with filtering, a deal flow pipeline ranked by AI investment scores, "
    "a DCF calculator with live financial modeling (cap rate, debt service, cash-on-cash return, DSCR), "
    "a market intelligence page with submarket analysis and macro drivers, and an AI Advisor page that "
    "connects to the Anthropic Claude API so users can ask real questions about the Orlando CRE market "
    "and get substantive answers. I built this because I wanted to combine my international business "
    "background with real financial modeling. The DCF calculator uses actual formulas (levered cash flow, "
    "equity multiples, debt service coverage ratios) and I wrote a detailed spec covering every page, "
    "every data point, and the exact design system before building it. I chose Orlando because it is one "
    "of the fastest-growing CRE markets in the Southeast and I wanted the data to feel grounded in a "
    "real geography rather than generic.",
    body_style,
))

# Project 2
story.append(Paragraph("2. History AI", bold_style))
story.append(Paragraph(
    'Live: <link href="https://history-ai-chi.vercel.app">https://history-ai-chi.vercel.app</link><br/>'
    'GitHub: <link href="https://github.com/serdtfryguhhash/history-ai">https://github.com/serdtfryguhhash/history-ai</link>',
    link_style,
))
story.append(Paragraph(
    "This is an interactive history education platform where users can have AI-powered conversations "
    "with 23 historical figures, take daily quizzes, follow structured learning paths, and engage in "
    "debate mode. The design uses a parchment-and-gold color scheme that fits the subject matter. I "
    "built this because I wanted to explore how AI could make history education more engaging than "
    "reading a textbook. The project required significant iteration on the conversation system, figuring "
    "out how to give each historical figure a distinct voice and accurate historical perspective, and "
    "building out the content library with reading times, era categorization, and curated lessons. It "
    'also has an "On This Day in History" feature that dynamically surfaces relevant historical events.',
    body_style,
))

# Project 3
story.append(Paragraph("3. HIP M&amp;A Analyzer", bold_style))
story.append(Paragraph(
    'Live: <link href="https://hip-ma-analyzer.vercel.app">https://hip-ma-analyzer.vercel.app</link><br/>'
    'GitHub: <link href="https://github.com/serdtfryguhhash/hip-ma-analyzer">https://github.com/serdtfryguhhash/hip-ma-analyzer</link>',
    link_style,
))
story.append(Paragraph(
    "This connects to independent research I've been doing with Dr. Sardy on AI and quantitative "
    "finance. The app presents original quantitative research analyzing 754 Chinese firms using OLS "
    "regression and ANOVA to study the relationship between high-impact patents (HIPs) and M&amp;A "
    "acquisition premiums. The dashboard displays real statistical output including R-squared values, "
    "F-statistics, p-values, and coefficient estimates with significance indicators. It also includes "
    "an executive summary that translates the findings for different audiences and a long-short portfolio "
    "performance analysis. I chose this project because I wanted to go beyond a typical UI demo and build "
    "something with genuine academic substance behind it. The research methodology, data analysis, and "
    "statistical interpretation required significant design work to present complex quantitative findings "
    "in an accessible way.",
    body_style,
))

# Closing paragraphs
story.append(Spacer(1, 6))
story.append(Paragraph(
    "All three projects are deployed on Vercel and publicly accessible with no login required. I wasn't "
    "able to be there in person for the demo, but I'd love to schedule a Zoom call to walk you through "
    "each project live if that works for you. I'll also submit the code and any supporting documents on Canvas.",
    body_style,
))

story.append(Paragraph(
    'If you\'d like to see the rest of my work, here is a portfolio I built with Claude that showcases '
    'all 28 of my apps: <link href="https://portfolio-five-sigma-78.vercel.app">'
    "https://portfolio-five-sigma-78.vercel.app</link>",
    body_style,
))

story.append(Paragraph(
    "Thank you very much for this class. I learned a lot and I think it changed a lot about my future "
    "and where I want to go with it. I would love to keep in touch after I graduate. Hopefully I can "
    "turn some of these into real products, though they're all still a work in progress.",
    body_style,
))

story.append(Paragraph("Thank you,", closing_style))
story.append(Paragraph("Logan Lisowski", ParagraphStyle("Name", parent=body_style, fontName="Helvetica-Bold", spaceBefore=2)))

doc.build(story)
print(f"PDF saved to {output_path}")
