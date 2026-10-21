import AppKit
import Foundation
import PDFKit

struct DeckCard: Decodable {
    let title: String
    let body: String?
    let note: String?
}

struct DeckSlide: Decodable {
    let label: String
    let title: String
    let subtitle: String?
    let note: String?
    let cover: Bool?
    let cards: [DeckCard]?
}

private let forest = NSColor(calibratedRed: 18 / 255, green: 61 / 255, blue: 49 / 255, alpha: 1)
private let forestLight = NSColor(calibratedRed: 35 / 255, green: 79 / 255, blue: 59 / 255, alpha: 1)
private let ink = NSColor(calibratedRed: 29 / 255, green: 48 / 255, blue: 39 / 255, alpha: 1)
private let muted = NSColor(calibratedRed: 108 / 255, green: 123 / 255, blue: 112 / 255, alpha: 1)
private let sage = NSColor(calibratedRed: 230 / 255, green: 238 / 255, blue: 226 / 255, alpha: 1)
private let paper = NSColor(calibratedRed: 248 / 255, green: 248 / 255, blue: 243 / 255, alpha: 1)
private let gold = NSColor(calibratedRed: 191 / 255, green: 153 / 255, blue: 88 / 255, alpha: 1)
private let line = NSColor(calibratedRed: 223 / 255, green: 231 / 255, blue: 220 / 255, alpha: 1)

final class SlidePageView: NSView {
    private let slide: DeckSlide
    private let index: Int
    private let total: Int

    init(slide: DeckSlide, index: Int, total: Int) {
        self.slide = slide
        self.index = index
        self.total = total
        super.init(frame: NSRect(x: 0, y: 0, width: 960, height: 540))
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) is not supported")
    }

    override var isFlipped: Bool { true }

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)
        if slide.cover == true {
            drawCover()
        } else {
            drawContentSlide()
        }
    }

    private func drawCover() {
        NSGradient(starting: forest, ending: forestLight)?.draw(in: bounds, angle: 0)

        for inset in stride(from: -60.0, through: 140.0, by: 42.0) {
            let circle = NSRect(x: 610 + inset, y: 68 + inset, width: 430 - inset, height: 430 - inset)
            let path = NSBezierPath(ovalIn: circle)
            NSColor(calibratedWhite: 1, alpha: 0.1).setStroke()
            path.lineWidth = 1
            path.stroke()
        }

        drawBrand(at: NSPoint(x: 64, y: 52), light: true)
        _ = drawText(slide.title, in: NSRect(x: 66, y: 187, width: 670, height: 114), size: 78, minimumSize: 68, weight: .bold, color: .white)
        _ = drawText(slide.subtitle ?? "", in: NSRect(x: 70, y: 304, width: 650, height: 72), size: 26, minimumSize: 22, weight: .medium, color: NSColor(calibratedRed: 220 / 255, green: 232 / 255, blue: 218 / 255, alpha: 1))
        _ = drawText((slide.note ?? "").uppercased(), in: NSRect(x: 70, y: 402, width: 440, height: 24), size: 11, minimumSize: 10, weight: .bold, color: NSColor(calibratedRed: 218 / 255, green: 190 / 255, blue: 132 / 255, alpha: 1), tracking: 1.6)
        drawText("STUDENT SUPPORT, WITH PURPOSE", in: NSRect(x: 70, y: 482, width: 400, height: 18), size: 9, minimumSize: 9, weight: .semibold, color: NSColor(calibratedWhite: 1, alpha: 0.72), tracking: 1.4)
    }

    private func drawContentSlide() {
        paper.setFill()
        bounds.fill()

        _ = drawText(slide.label.uppercased(), in: NSRect(x: 58, y: 31, width: 570, height: 20), size: 9, minimumSize: 8, weight: .bold, color: muted, tracking: 1.4)
        drawBrand(at: NSPoint(x: 820, y: 25), light: false)
        let rule = NSBezierPath()
        rule.move(to: NSPoint(x: 58, y: 58))
        rule.line(to: NSPoint(x: 902, y: 58))
        line.setStroke()
        rule.lineWidth = 1
        rule.stroke()

        _ = drawText(slide.title, in: NSRect(x: 58, y: 77, width: 844, height: 90), size: 32, minimumSize: 24, weight: .bold, color: forest)
        let hasSubtitle = !(slide.subtitle ?? "").isEmpty
        if let subtitle = slide.subtitle, !subtitle.isEmpty {
            _ = drawText(subtitle, in: NSRect(x: 60, y: 163, width: 838, height: 39), size: 12, minimumSize: 10, weight: .regular, color: muted)
        }

        if let cards = slide.cards, !cards.isEmpty {
            drawCards(cards, top: hasSubtitle ? 214 : 190, bottom: slide.note == nil ? 474 : 445)
        }

        if let note = slide.note, !note.isEmpty {
            drawNote(note)
        }
    }

    private func drawCards(_ cards: [DeckCard], top: CGFloat, bottom: CGFloat) {
        let columns = cards.count <= 2 || cards.count == 4 ? 2 : 3
        let rows = Int(ceil(Double(cards.count) / Double(columns)))
        let gap: CGFloat = 12
        let cardWidth = (844 - CGFloat(columns - 1) * gap) / CGFloat(columns)
        let cardHeight = (bottom - top - CGFloat(rows - 1) * gap) / CGFloat(rows)

        for (cardIndex, card) in cards.enumerated() {
            let row = cardIndex / columns
            let column = cardIndex % columns
            let rect = NSRect(
                x: 58 + CGFloat(column) * (cardWidth + gap),
                y: top + CGFloat(row) * (cardHeight + gap),
                width: cardWidth,
                height: cardHeight
            )
            drawCard(card, number: cardIndex + 1, in: rect, compact: rows > 1)
        }
    }

    private func drawCard(_ card: DeckCard, number: Int, in rect: NSRect, compact: Bool) {
        let path = NSBezierPath(roundedRect: rect, xRadius: 9, yRadius: 9)
        (number.isMultiple(of: 3) ? sage : .white).setFill()
        path.fill()
        line.setStroke()
        path.lineWidth = 1
        path.stroke()

        let inset: CGFloat = compact ? 12 : 17
        _ = drawText(String(format: "%02d", number), in: NSRect(x: rect.minX + inset, y: rect.minY + 11, width: 38, height: 15), size: 8, minimumSize: 8, weight: .bold, color: gold, tracking: 1.2)

        let titleRect = NSRect(x: rect.minX + inset, y: rect.minY + 31, width: rect.width - inset * 2, height: compact ? 42 : 52)
        let titleHeight = drawText(card.title, in: titleRect, size: compact ? 12 : 15, minimumSize: 10, weight: .bold, color: forest)
        let bodyStart = titleRect.minY + max(titleHeight, compact ? 23 : 30) + 5

        if let body = card.body, !body.isEmpty {
            let noteHeight: CGFloat = (card.note?.isEmpty == false) ? (compact ? 31 : 37) : 0
            let bodyRect = NSRect(
                x: rect.minX + inset,
                y: bodyStart,
                width: rect.width - inset * 2,
                height: max(20, rect.maxY - bodyStart - noteHeight - 10)
            )
            _ = drawText(body, in: bodyRect, size: compact ? 10 : 11, minimumSize: 8, weight: .regular, color: muted)
        }

        if let note = card.note, !note.isEmpty {
            let noteRect = NSRect(x: rect.minX + inset, y: rect.maxY - (compact ? 42 : 50), width: rect.width - inset * 2, height: compact ? 34 : 42)
            _ = drawText(note, in: noteRect, size: compact ? 8 : 9, minimumSize: 7.5, weight: .medium, color: NSColor(calibratedRed: 126 / 255, green: 117 / 255, blue: 92 / 255, alpha: 1))
        }
    }

    private func drawNote(_ note: String) {
        let rect = NSRect(x: 58, y: 455, width: 844, height: 42)
        let path = NSBezierPath(roundedRect: rect, xRadius: 5, yRadius: 5)
        NSColor(calibratedRed: 244 / 255, green: 242 / 255, blue: 232 / 255, alpha: 1).setFill()
        path.fill()
        NSColor(calibratedRed: 180 / 255, green: 155 / 255, blue: 101 / 255, alpha: 1).setFill()
        NSBezierPath(rect: NSRect(x: rect.minX, y: rect.minY, width: 3, height: rect.height)).fill()
        _ = drawText(note, in: NSRect(x: 72, y: 459, width: 815, height: 34), size: 8.5, minimumSize: 7.5, weight: .medium, color: muted)
    }

    private func drawBrand(at point: NSPoint, light: Bool) {
        let mark = NSRect(x: point.x, y: point.y, width: 25, height: 25)
        let markPath = NSBezierPath(roundedRect: mark, xRadius: 7, yRadius: 7)
        (light ? NSColor.white : forest).setFill()
        markPath.fill()
        let markColor = light ? forest : NSColor.white
        _ = drawText("j", in: NSRect(x: mark.minX + 7, y: mark.minY + 1, width: 15, height: 22), size: 18, minimumSize: 18, weight: .bold, color: markColor)
        _ = drawText("junnah", in: NSRect(x: point.x + 33, y: point.y + 3, width: 90, height: 21), size: 16, minimumSize: 16, weight: .bold, color: light ? .white : forest)
    }

    @discardableResult
    private func drawText(
        _ value: String,
        in rect: NSRect,
        size: CGFloat,
        minimumSize: CGFloat,
        weight: NSFont.Weight,
        color: NSColor,
        alignment: NSTextAlignment = .left,
        tracking: CGFloat = 0
    ) -> CGFloat {
        var fontSize = size
        let paragraph = NSMutableParagraphStyle()
        paragraph.alignment = alignment
        paragraph.lineBreakMode = .byWordWrapping
        paragraph.lineSpacing = 1.5

        func attributes(_ pointSize: CGFloat) -> [NSAttributedString.Key: Any] {
            [
                .font: NSFont.systemFont(ofSize: pointSize, weight: weight),
                .foregroundColor: color,
                .paragraphStyle: paragraph,
                .kern: tracking
            ]
        }

        let string = value as NSString
        var measured = string.boundingRect(
            with: NSSize(width: rect.width, height: .greatestFiniteMagnitude),
            options: [.usesLineFragmentOrigin, .usesFontLeading],
            attributes: attributes(fontSize)
        )
        while measured.height > rect.height && fontSize > minimumSize {
            fontSize -= 0.5
            measured = string.boundingRect(
                with: NSSize(width: rect.width, height: .greatestFiniteMagnitude),
                options: [.usesLineFragmentOrigin, .usesFontLeading],
                attributes: attributes(fontSize)
            )
        }

        NSAttributedString(string: value, attributes: attributes(fontSize)).draw(
            with: rect,
            options: [.usesLineFragmentOrigin, .usesFontLeading]
        )
        return measured.height
    }
}

let arguments = CommandLine.arguments
guard arguments.count == 3 else {
    fatalError("Usage: swift scripts/generate-deck-pdf.swift <slide-data.json> <output.pdf>")
}

let inputURL = URL(fileURLWithPath: arguments[1])
let outputURL = URL(fileURLWithPath: arguments[2])
let slideData = try Data(contentsOf: inputURL)
let slides = try JSONDecoder().decode([DeckSlide].self, from: slideData)

NSApplication.shared.setActivationPolicy(.prohibited)
let document = PDFDocument()
for (index, slide) in slides.enumerated() {
    let view = SlidePageView(slide: slide, index: index, total: slides.count)
    let pageData = view.dataWithPDF(inside: view.bounds)
    guard let page = PDFDocument(data: pageData)?.page(at: 0) else {
        fatalError("Could not render slide \(index + 1)")
    }
    document.insert(page, at: index)
}
document.documentAttributes = [
    PDFDocumentAttribute.titleAttribute: "Junnah | Student support, with purpose",
    PDFDocumentAttribute.authorAttribute: "Junnah",
    PDFDocumentAttribute.creatorAttribute: "Junnah website deck generator"
]
try FileManager.default.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)
guard document.write(to: outputURL) else {
    fatalError("Could not write PDF to \(outputURL.path)")
}
print("Wrote \(slides.count) slides to \(outputURL.path)")
