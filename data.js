/* OSI Security Rings — content model. Edit here to change what appears on the rings. */
"use strict";
const LAYERS = [
  {
    n: 7, name: "Application", pdu: "Data", colour: "#E5487A",
    fn: "Network services exposed to applications and users: web, mail, naming, directory, remote access and management.",
    threats: ["Injection (SQLi, XSS)", "Credential stuffing", "Phishing", "API abuse", "Malware delivery", "DNS tunnelling"],
    protocols: [
      { n: "HTTP/S", d: "Hypertext Transfer Protocol (TCP 80/443; HTTP/3 runs over QUIC)." },
      { n: "DNS", d: "Domain Name System resolution (UDP/TCP 53; DoT 853, DoH 443)." },
      { n: "SMTP", d: "Mail transfer between servers and submission from clients (TCP 25/587)." },
      { n: "IMAP/POP3", d: "Mailbox retrieval (IMAP 143/993, POP3 110/995)." },
      { n: "FTP", d: "File Transfer Protocol (TCP 20/21) – cleartext; prefer SFTP/FTPS." },
      { n: "SSH", d: "Secure Shell for remote administration, SFTP and tunnelling (TCP 22)." },
      { n: "SNMP", d: "Device monitoring and management (UDP 161/162); use v3 for auth and encryption." },
      { n: "LDAP", d: "Directory access (TCP 389; LDAPS 636)." },
      { n: "DHCP", d: "Dynamic host configuration (UDP 67/68)." },
      { n: "NTP", d: "Network Time Protocol (UDP 123) – time integrity underpins logs and Kerberos." },
      { n: "RDP", d: "Remote Desktop Protocol (TCP/UDP 3389)." },
      { n: "Kerberos", d: "Ticket-based network authentication (TCP/UDP 88)." },
      { n: "SIP", d: "Session Initiation Protocol for VoIP signalling (5060/5061)." },
      { n: "MQTT", d: "Lightweight publish/subscribe messaging for IoT (1883; TLS 8883)." }
    ],
    security: [
      { n: "WAF", d: "Web application firewall – blocks OWASP Top 10 attacks such as SQL injection and XSS at the HTTP layer." },
      { n: "API gateway", d: "Central authentication, authorisation, schema validation and rate limiting for APIs." },
      { n: "IAM · SSO · MFA", d: "Federated identity (SAML, OIDC) with phishing-resistant MFA such as FIDO2/passkeys." },
      { n: "PAM", d: "Privileged access management – credential vaulting, just-in-time elevation, session brokering." },
      { n: "SPF · DKIM · DMARC", d: "Email domain authentication plus secure email gateway filtering against spoofing and phishing." },
      { n: "Protective DNS", d: "Resolver-level blocking of malicious domains (e.g. NCSC PDNS) and DNSSEC validation." },
      { n: "SWG / CASB", d: "Secure web gateway and cloud access security broker controlling web and SaaS use." },
      { n: "DLP", d: "Data loss prevention – content inspection to detect and stop exfiltration." },
      { n: "EDR / AV", d: "Endpoint detection and response and anti-malware on hosts running the application." },
      { n: "SAST · DAST · SCA", d: "Secure development testing: static, dynamic and software composition (dependency) analysis." },
      { n: "RASP", d: "Runtime application self-protection – in-process detection and blocking of attacks." },
      { n: "Secrets vault", d: "Managed storage and rotation of credentials, keys and tokens; removes hard-coded secrets." }
    ]
  },
  {
    n: 6, name: "Presentation", pdu: "Data", colour: "#F07A3E",
    fn: "Translation between application and network formats: encoding, serialisation, compression and encryption.",
    threats: ["TLS downgrade / SSL stripping", "Weak ciphers", "Malicious file formats", "Deserialisation RCE", "Encoding evasion"],
    protocols: [
      { n: "TLS/SSL", d: "Transport Layer Security – commonly mapped to L6 (spans L4–L7). SSL and TLS 1.0/1.1 are deprecated." },
      { n: "MIME", d: "Multipurpose Internet Mail Extensions – content typing and encoding." },
      { n: "ASCII/UTF-8", d: "Character encodings." },
      { n: "EBCDIC", d: "Mainframe character encoding." },
      { n: "JPEG/PNG/GIF", d: "Image formats." },
      { n: "MPEG/MP4", d: "Audio and video formats." },
      { n: "XDR", d: "External Data Representation – used by ONC RPC and NFS." },
      { n: "ASN.1", d: "Abstract Syntax Notation One (BER/DER) – used by X.509, SNMP and LDAP." },
      { n: "JSON/XML", d: "Structured data serialisation formats." },
      { n: "Base64", d: "Binary-to-text encoding." },
      { n: "gzip", d: "Compression (deflate, gzip, Brotli)." }
    ],
    security: [
      { n: "TLS 1.3 policy", d: "Enforce TLS 1.2+/1.3, strong cipher suites, HSTS; disable SSL and early TLS." },
      { n: "PKI & cert lifecycle", d: "CA hierarchy, automated issuance and renewal (ACME), revocation and certificate transparency monitoring." },
      { n: "S/MIME · PGP", d: "Message-level encryption and digital signatures." },
      { n: "Post-quantum crypto", d: "Migration to ML-KEM / ML-DSA (FIPS 203/204), hybrid key exchange and crypto-agility." },
      { n: "CDR", d: "Content disarm and reconstruction – rebuilds files without active content." },
      { n: "Input canonicalisation", d: "Decode and normalise input before validation to defeat encoding-based bypasses." },
      { n: "Safe deserialisation", d: "Schema validation and type allow-listing to prevent deserialisation attacks." }
    ]
  },
  {
    n: 5, name: "Session", pdu: "Data", colour: "#F2C14E",
    fn: "Establishes, manages, synchronises and terminates dialogues between communicating hosts.",
    threats: ["Session hijacking", "Session fixation", "Replay attacks", "NTLM / SMB relay"],
    protocols: [
      { n: "NetBIOS", d: "NetBIOS session service (TCP 139) – legacy Windows networking." },
      { n: "RPC", d: "Remote procedure call (ONC RPC, DCE/MS-RPC)." },
      { n: "SOCKS", d: "Proxy protocol relaying sessions (TCP 1080)." },
      { n: "PPTP", d: "Point-to-Point Tunnelling Protocol – legacy and cryptographically broken." },
      { n: "L2TP", d: "Layer 2 Tunnelling Protocol – usually paired with IPsec for confidentiality." },
      { n: "H.245", d: "Multimedia call control within the H.323 suite." },
      { n: "SDP", d: "Session Description Protocol – negotiates media sessions for SIP/WebRTC." },
      { n: "RTCP", d: "RTP Control Protocol – session quality and synchronisation." }
    ],
    security: [
      { n: "Secure session tokens", d: "High-entropy session IDs; Secure, HttpOnly and SameSite cookie flags." },
      { n: "Timeouts & re-auth", d: "Idle and absolute timeouts; step-up authentication for sensitive actions." },
      { n: "Mutual TLS", d: "Both parties authenticate with certificates – service-to-service trust." },
      { n: "Anti-replay", d: "Nonces, timestamps and sequence numbers to reject replayed sessions." },
      { n: "SMB/RPC signing", d: "Message signing, SMBv1/NetBIOS disabled, RPC filtering to stop relay attacks." },
      { n: "ZTNA broker", d: "Zero Trust Network Access – per-session, identity and device-posture aware access." },
      { n: "DPoP / token binding", d: "Sender-constrained tokens so stolen tokens cannot be replayed elsewhere." },
      { n: "Session recording", d: "Monitoring and recording of privileged sessions (via PAM)." }
    ]
  },
  {
    n: 4, name: "Transport", pdu: "Segment / Datagram", colour: "#3CC48A",
    fn: "End-to-end delivery between hosts: ports, segmentation, reliability, ordering and flow control.",
    threats: ["SYN flood", "Port scanning", "UDP amplification", "TCP hijack / reset injection"],
    protocols: [
      { n: "TCP", d: "Transmission Control Protocol – connection-oriented, reliable, ordered delivery." },
      { n: "UDP", d: "User Datagram Protocol – connectionless, low-overhead delivery." },
      { n: "QUIC", d: "Encrypted, multiplexed transport over UDP; basis of HTTP/3." },
      { n: "SCTP", d: "Stream Control Transmission Protocol – multi-stream, multi-homed (telecoms signalling)." },
      { n: "DCCP", d: "Datagram Congestion Control Protocol." },
      { n: "MPTCP", d: "Multipath TCP – one connection across several network paths." },
      { n: "SPX", d: "Sequenced Packet Exchange – legacy Novell transport." }
    ],
    security: [
      { n: "Stateful firewall", d: "Tracks connection state; allow-lists permitted ports and flows." },
      { n: "SYN cookies", d: "Resists SYN floods without exhausting connection state." },
      { n: "DDoS & rate limiting", d: "Connection limits and mitigation of protocol and volumetric attacks." },
      { n: "IDS / IPS", d: "Signature and anomaly detection on flows (typically inspects L3–L7)." },
      { n: "TCP-AO", d: "TCP Authentication Option (RFC 5925) – protects long-lived sessions such as BGP." },
      { n: "Load balancer / proxy", d: "Reverse proxy with TLS termination, connection limits and origin hiding." },
      { n: "Micro-segmentation", d: "Host-based port and service policy restricting east-west traffic." }
    ]
  },
  {
    n: 3, name: "Network", pdu: "Packet", colour: "#2BB8C8",
    fn: "Logical addressing and routing of packets between networks.",
    threats: ["IP spoofing", "BGP route hijacking", "ICMP floods", "Routing manipulation (MITM)"],
    protocols: [
      { n: "IPv4", d: "Internet Protocol version 4 – 32-bit addressing." },
      { n: "IPv6", d: "Internet Protocol version 6 – 128-bit addressing." },
      { n: "ICMP/ICMPv6", d: "Control and error messaging (ping, traceroute, IPv6 neighbour discovery)." },
      { n: "IGMP", d: "Multicast group membership." },
      { n: "OSPF", d: "Open Shortest Path First – link-state interior routing." },
      { n: "BGP", d: "Border Gateway Protocol – inter-domain routing (carried over TCP 179, charted at L3 for its routing role)." },
      { n: "RIP", d: "Routing Information Protocol – distance-vector routing." },
      { n: "EIGRP", d: "Enhanced Interior Gateway Routing Protocol." },
      { n: "IS-IS", d: "Intermediate System to Intermediate System – link-state routing." },
      { n: "GRE", d: "Generic Routing Encapsulation tunnelling." },
      { n: "IPX", d: "Internetwork Packet Exchange – legacy Novell." }
    ],
    security: [
      { n: "Packet filter / ACLs", d: "Source/destination address allow-listing on routers and firewalls." },
      { n: "IPsec VPN", d: "AH/ESP integrity and encryption for site-to-site and remote access." },
      { n: "Anti-spoofing (uRPF)", d: "Ingress filtering of forged source addresses (BCP 38, unicast RPF)." },
      { n: "RPKI / ROV", d: "Route origin validation – cryptographic checking of BGP route origins." },
      { n: "Routing auth", d: "OSPF/BGP/IS-IS HMAC authentication and TTL security (GTSM)." },
      { n: "Segmentation (VRF / zones)", d: "Separation of trust zones and routing domains." },
      { n: "DDoS scrubbing / RTBH", d: "Upstream scrubbing and remote-triggered blackhole routing." },
      { n: "ICMP filtering", d: "Rate-limit and filter ICMP while preserving path MTU discovery." }
    ]
  },
  {
    n: 2, name: "Data Link", pdu: "Frame", colour: "#4A7FE8",
    fn: "Node-to-node delivery across a link: MAC addressing, framing, error detection and switching.",
    threats: ["ARP poisoning", "MAC flooding", "VLAN hopping", "Rogue DHCP", "Evil-twin Wi-Fi", "STP manipulation"],
    protocols: [
      { n: "Ethernet 802.3", d: "IEEE 802.3 framing and MAC addressing." },
      { n: "Wi-Fi 802.11 MAC", d: "Wireless LAN media access control." },
      { n: "ARP", d: "Address Resolution Protocol – maps IPv4 to MAC addresses." },
      { n: "PPP", d: "Point-to-Point Protocol." },
      { n: "802.1Q VLAN", d: "VLAN tagging for logical LAN separation." },
      { n: "STP/RSTP", d: "Spanning Tree – loop prevention in switched networks." },
      { n: "LLDP/CDP", d: "Link-layer neighbour discovery." },
      { n: "LACP", d: "Link aggregation (802.3ad / 802.1AX)." },
      { n: "MPLS", d: "Multiprotocol Label Switching – often described as layer 2.5." },
      { n: "HDLC", d: "High-Level Data Link Control." },
      { n: "Frame Relay", d: "Legacy packet-switched WAN." }
    ],
    security: [
      { n: "802.1X / NAC", d: "Port-based network access control using EAP authentication and device posture." },
      { n: "MACsec 802.1AE", d: "Hop-by-hop Ethernet encryption and integrity." },
      { n: "Port security", d: "MAC address limiting and sticky MACs to stop MAC flooding." },
      { n: "Dynamic ARP Inspection", d: "Validates ARP against DHCP snooping bindings to block ARP poisoning." },
      { n: "DHCP snooping", d: "Blocks rogue DHCP servers on untrusted ports." },
      { n: "Private VLANs", d: "Host isolation; VLAN hygiene (no VLAN 1 native, DTP disabled) against VLAN hopping." },
      { n: "BPDU / root guard", d: "Protects spanning-tree topology from rogue switches." },
      { n: "RA Guard", d: "Blocks rogue IPv6 router advertisements at the switch port." },
      { n: "WPA3-Enterprise", d: "802.1X / SAE Wi-Fi authentication with modern encryption." },
      { n: "WIPS", d: "Wireless intrusion prevention – rogue AP and evil-twin detection." }
    ]
  },
  {
    n: 1, name: "Physical", pdu: "Bits / Symbols", colour: "#9B6BE8",
    fn: "Transmission of raw bits over a physical medium: cabling, connectors, radio, voltages and timing.",
    threats: ["Wiretapping / fibre tapping", "Theft or damage", "RF jamming", "Compromising emanations", "Rogue hardware implants"],
    protocols: [
      { n: "Ethernet PHY (BASE-T)", d: "Copper Ethernet physical layer (10/100/1000BASE-T and beyond)." },
      { n: "Fibre (BASE-SX/LX)", d: "Optical Ethernet physical layer." },
      { n: "802.11 PHY", d: "Wi-Fi radio (OFDM, 2.4/5/6 GHz)." },
      { n: "Bluetooth PHY", d: "Short-range 2.4 GHz radio." },
      { n: "5G NR", d: "5G New Radio air interface." },
      { n: "DSL", d: "Digital Subscriber Line over copper telephone pairs." },
      { n: "DOCSIS", d: "Data over cable (coaxial) networks." },
      { n: "GPON", d: "Gigabit Passive Optical Network (fibre to the premises)." },
      { n: "SONET/SDH", d: "Synchronous optical transport." },
      { n: "ISDN", d: "Integrated Services Digital Network – legacy." },
      { n: "USB", d: "Universal Serial Bus physical signalling." },
      { n: "RS-232", d: "Serial interface – console and OT/ICS links." }
    ],
    security: [
      { n: "Physical access control", d: "Locks, badges, mantraps and visitor control for comms rooms and data centres." },
      { n: "CCTV & intrusion detection", d: "Monitoring of secure areas and cable routes." },
      { n: "Secure cabling & conduits", d: "Protected distribution systems with inspectable cable runs." },
      { n: "Port blockers & locks", d: "Physically disable unused network and USB ports." },
      { n: "TEMPEST / EMSEC", d: "Emission security – shielding and zoning against compromising emanations." },
      { n: "Fibre-tap detection", d: "Optical power monitoring to detect bending or tapping of fibre." },
      { n: "RF monitoring & anti-jamming", d: "Spectrum monitoring and resilient modulation such as frequency hopping." },
      { n: "Tamper-evident seals", d: "Reveal physical interference with devices and enclosures." },
      { n: "QKD", d: "Quantum key distribution over fibre – NCSC does not currently endorse it for government use; prefer PQC." },
      { n: "Resilient power & diverse routes", d: "UPS, generators and physically diverse paths for availability." }
    ]
  }
];

const CROSS_LAYER = [
  { n: "Zero Trust architecture", d: "Never trust, always verify – policy decisions use identity, device and context at every layer." },
  { n: "SIEM / SOAR", d: "Central log correlation, detection and automated response across all layers." },
  { n: "NDR", d: "Network detection and response – behavioural analytics on traffic (L2–L7)." },
  { n: "XDR", d: "Extended detection and response correlating endpoint, network, identity and cloud telemetry." },
  { n: "NGFW (L3–L7)", d: "Next-generation firewall combining stateful filtering, application awareness and IPS." },
  { n: "Threat intelligence", d: "Indicators and adversary TTPs (e.g. MITRE ATT&CK) informing controls at every layer." },
  { n: "Asset & config management", d: "Inventory, hardening baselines and drift detection." },
  { n: "Vulnerability management", d: "Continuous scanning, prioritisation and patching." }
];

/* Animated dataflow scenarios: a malicious packet is stopped on the receiving
   stack by the named control (must match a security item name at that layer). */
const THREATS = [
  { layer: 1, name: "Fibre tap", control: "Fibre-tap detection" },
  { layer: 2, name: "ARP spoofing", control: "Dynamic ARP Inspection" },
  { layer: 2, name: "Rogue DHCP offer", control: "DHCP snooping" },
  { layer: 2, name: "Unauthorised device", control: "802.1X / NAC" },
  { layer: 3, name: "Spoofed source IP", control: "Anti-spoofing (uRPF)" },
  { layer: 3, name: "Hijacked BGP route", control: "RPKI / ROV" },
  { layer: 4, name: "SYN flood", control: "SYN cookies" },
  { layer: 4, name: "Port scan", control: "IDS / IPS" },
  { layer: 5, name: "Replayed session", control: "Anti-replay" },
  { layer: 5, name: "Stolen bearer token", control: "DPoP / token binding" },
  { layer: 6, name: "TLS downgrade", control: "TLS 1.3 policy" },
  { layer: 6, name: "Weaponised document", control: "CDR" },
  { layer: 7, name: "SQL injection", control: "WAF" },
  { layer: 7, name: "Credential stuffing", control: "IAM · SSO · MFA" },
  { layer: 7, name: "Malicious domain lookup", control: "Protective DNS" },
  { layer: 7, name: "Malware payload", control: "EDR / AV" }
];

const BENIGN = ["HTTPS request", "DNS query", "API call", "SMTP message", "SSH session", "LDAP query", "NTP sync", "MQTT telemetry"];
